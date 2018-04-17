require('dotenv').load();

const express = require('express'),
  app = express(),
  path = require('path'),
  port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})

