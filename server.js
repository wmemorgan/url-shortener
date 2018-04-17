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

const errorMessage = () => {
  return {
    "error": "Wrong url format, make sure you have a valid protocol and real site." 
  }
}

app.get('/new/:url(*)', (req, res) => {
  let newURL = req.url.slice(5);
  //Validate URL
  if (validURL.isUri(newURL)) {
    console.log('URL looks good')
    console.log(newURL);
    res.send(newURL);
  } else {
    console.log(errorMessage());
    res.send(errorMessage())
  }

})

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})

