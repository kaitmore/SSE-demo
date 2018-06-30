const http = require("http");
const express = require("express");
const sse = require("./sse");
const bodyParser = require("body-parser");
const app = express();

let connections = [];
let messages = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({ type: "application/*+json" }));

let connectionId = 0;

app.post("/message", function(req, res) {
  const messageBody = req.body.message;
  const user = req.body.name;
  const message = { message: messageBody, user, timeStamp: Date.now() };

  messages = [message, ...messages];
  connections.forEach(connection => {
    sse.sendEvent(connection.stream, message);
  });

  // Send back a success status to the post request
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendStatus(200);
});

app.get("/stream", function(req, res) {
  // Associate an id with the request so we can close the connection later
  req.id = connectionId;
  sse.setup(res, messages);
  connections.push({ stream: res, id: connectionId });
  connectionId++;
  console.log("Current connections:", connections.length);
  req.on("close", () => {
    const deadConnection = connections.filter(
      connection => connection.id === req.id
    )[0];
    if (deadConnection) {
      deadConnection.stream.end();
      connections = connections.filter(connection => connection.id !== req.id);
    }
    console.log("Stopped sending events to connection:", req.id);
    console.log("Current connections:", connections.length);
  });
});

app.listen(1337);
