require('dotenv').load();

const express = require('express'),
  hostURL = require('url'),
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

const validateURL = (url) => {
  if (validURL.isUri(url)) {
    console.log('URL looks good')
    console.log(url);
    return {
      original_url: url
    }
  } else {
    console.log(errorMessage());
    return errorMessage();
  }
}

app.get('/new/:url(*)', (req, res) => {
  let newURL = req.url.slice(5);
  // res.send(validateURL(newURL));
  let reqURL = hostURL.format({
    protocol: req.protocol,
    host: req.get('host'),
    // pathname: req.originalUrl,
  });

  console.log(reqURL);
  res.send(reqURL);

})

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})

