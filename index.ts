import axios from "axios";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const instance = axios.create({
  baseURL: `https://api.fitbit.com/1/user/${process.env.USER_ID}`,
  method: "GET",
  headers: { authorization: process.env.BEARER_TOKEN },
});

const getRuns = async () => {
  let offset = 0;
  while (true) {
    const url = `/activities/list.json?afterDate=2010-01-01&sort=asc&offset=${offset}&limit=100`;
    const res = await instance({ url });
    const activities = res.data.activities;
    if (activities.length === 0) break;
    const runs = activities.filter((log: any) => log.activityName === "Run");
    runs.forEach((run: any) => downloadTcx(run.logId));
    offset += 100;
  }
};

const downloadTcx = async (activity: any) => {
  const url = `/activities/${activity}.tcx?includePartialTCX=true`;
  const res = await instance({ url, responseType: "stream" });
  const stream = fs.createWriteStream(`runs/${activity}.tcx`);
  res.data.pipe(stream);
  return new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
};

getRuns();
