require('dotenv').load();

const express = require('express'),
  mongodb = require('mongodb'),
  path = require('path'),
  shortid = require('shortid'),
  validURL = require('valid-url'),
  MongoClient = mongodb.MongoClient,
  url = process.env.DBCONNECT,
  port = process.env.PORT || 3000,
  app = express();

// MongoClient.connect(url, (err, conn) => {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     console.log('Connection established to', url);
//     conn.close();
//   }
// })

// console.log(shortid.generate());

//Valid URLs
// let myURL = '1';

// if (validURL.isUri(myURL)) {
//   console.log('Looks like an URI');
// } else {
//   console.log('Not a URI');
// }

app.get('/new/:url(*)', (req, res) => {
  let newURL = req.url.slice(5);
  console.log(newURL);
  res.send(newURL);
})

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})

