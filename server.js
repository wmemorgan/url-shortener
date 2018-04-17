const express = require('express'),
  app = express(),
  path = require('path'),
  port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server is listening on port:", port);
})

