require('dotenv').load();

const express = require('express'),
  mongodb = require('mongodb'),
  path = require('path'),
  MongoClient = mongodb.MongoClient,
  url = process.env.DBCONNECT,
  port = process.env.PORT || 3000,
  app = express();

MongoClient.connect(url, (err, conn) => {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    conn.close();
  }
})

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})

