# FitBit Export

This is a small script I wrote that uses the Fitbit API to download all my old runs with GPS data and download their respective TCX files.

## Setup

You'll need to find your user ID as well as your Bearer Auth token and places these in the provided ENV file. I didn't sign up for an API key, I just pulled these off the Fitbit dashboard by looking at the requests it was sending to its API when loading data.

## Running

Once these ENV variables are added the script can be run using `npm start`. The TCX files will be downloaded to the "runs" folder and needed according to their activity ID. These files can then be manually uploaded to Strava via their website.
