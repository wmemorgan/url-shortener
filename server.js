require('dotenv').load();

const express = require('express'),
  hostURL = require('url'),
  mongodb = require('mongodb'),
  path = require('path'),
  shortid = require('shortid'),
  validURL = require('valid-url'),
  MongoClient = mongodb.MongoClient,
  dbURL = process.env.DBCONNECT,
  // dbURL = 'mongodb://localhost:27017/urls',
  port = process.env.PORT || 3000,
  app = express();



// console.log(shortid.generate());

const errorMessage = () => {
  return {
    "error": "Wrong url format, make sure you have a valid protocol and real site." 
  }
}

const validateURL = (url, host) => {
  if (validURL.isUri(url)) {
    console.log('URL looks good')
    console.log(url);
    let id = shortid.generate();
    insertURL(url, id);
    return {
      original_url: url,
      short_url: host + '/' + id
    }
  } else {
    console.log(errorMessage());
    return errorMessage();
  }
}

const insertURL = (url, id) => {
  MongoClient.connect(dbURL, (err, conn) => {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', dbURL);
      const data = conn.db("url-shortdb"),
        collection = data.collection("urls");
      let newURL = { original_url: url, urlid: id }
      collection.insertOne(newURL, (err, res) => {
        if (err) throw err;
        console.log("1 document inserted");
        conn.close();
      });
    }
  })
}

app.get('/new/:url(*)', (req, res) => {
  let newURL = req.url.slice(5);
  let serverURL = hostURL.format({
    protocol: req.protocol,
    host: req.get('host'),
  });

  res.send(validateURL(newURL, serverURL));

})

app.get('/:shorturl(*)', (req, res) => {
  let shorturl = req.url.slice(1);
  console.log("The shorturl is:", shorturl);
  MongoClient.connect(dbURL, (err, conn) => {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', dbURL);
      const data = conn.db("urls"),
        collection = data.collection("url-shortdb");
      collection.findOne({'urlid': shorturl}, (err, doc) => {
        if (doc != null) {
          res.redirect(doc.original_url);
        } else {
          res.json({error: "link not found in the database."});
        }
        conn.close();
      });
    } 
  });
})

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})

