# AIS viewer

Pulls the data from aisstream.io, stores in the postgresdb and exposes /vessels-position endpoint to get the data for a bounding box.

The bounding box cannot be larger than approximately 100nm²

The data from the stream is buffered in memory and flushed to the database every 1 second.


Prerequisites for running:
1. Docker
2. Docker Compose
3. Node.js
4. aisstream.io api key

How to run:

1. install deps `yarn install`
2. create a `.env` file in the root directory from the .env.template, make sure to fill the `AIS_STREAM_API_KEY`
3. run `docker-compose up -d --build`
4. run db migrations `yarn migration:run`
5. build the code `yarn build`
6. run the server `yarn start`

