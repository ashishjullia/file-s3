const http = require('http');
const bodyParser = require('body-parser');
require('dotenv/config');

// Express prepared
const expressInstance = require('express');
const express = new expressInstance();
const server = http.createServer(express);

// Server created
server.listen(7000, function() {
  var addr = server.address();
  console.log(`Node is listening on -> ${addr.address}:${addr.port}`);
});

// Make our app use the body-parser
express.use(bodyParser.json());

const downloadRoute = require('./routes/downloadRoute');

express.use('/', downloadRoute);