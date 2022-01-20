// importl modules
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./common/log.js");

// setup express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import routers
let routes = require("./controllers/routes.js");
app.use("/", routes);

// start server
const server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function () {
  // body...
  console.log("Server is running on port", port);
});
