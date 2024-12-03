"use strict";
const express = require("express");
const api = express();
const server = require("node:http").createServer(api);
const events = require("node:events");
const EventEmitter = new events();
const cors = require("cors");
require("dotenv").config();
require("dotenv").configDotenv();
const { atob, btoa } = require("node:buffer");

var ApiInformation = require("../../model/json/api.information.json");

// manage websocket for the API connections
const WebSocket = require("ws").Server;
const connection = new WebSocket({ port: 5000 });
connection.on("connection", (ws) => {
  console.log("web socket connection made!");
  ws.on("message", (message) => ws.send(message));
  ws.on("error", (error) => ws.send(error));
});

// middleware for CORS handling and overcome CORS errors to allow * access
// allow credentials like cookies to be passed
// middleware for handling API
const cookieParser = require("cookie-parser");
api.use(cookieParser()); // allow api to accept use of cookies

api.use(cors({ origin: "*", Credential: Boolean(true) }));
api.use((request, response, next) => {
  this.response = response;
  this.request = request;

  this.response.setHeader("Content-Type", "Application/json");
  this.response.setHeader("Access-Control-Allow-Origins", "*");
  this.response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, DELETE, POST"
  );
  this.response.setHeader("Access-Control-Allow-Credentials", Boolean(true));
  this.response.setHeader("Connection", "Keep-alive");

  // send api cookies to browser
  // first encode the cookies before sending to the web browser
  this.response.cookie(
    "_VISITOR_PRIVACY_METADATA",
    btoa(ApiInformation.metadata["privacy"]),
    {
      expires: Number(parseInt(new Date(Date.now * Number(parseInt(1800000))))),
      httpOnly: Boolean(true),
    }
  );
  this.response.cookie(
    "_VISITOR_TERMS_METADATA",
    btoa(ApiInformation.metadata["terms"]),
    {
      expires: Number(parseInt(new Date(Date.now * Number(parseInt(1800000))))),
      httpOnly: Boolean(true),
    }
  );
  /* 
  send !httpOnly cookie to remember user and send cookie message on view 
    to allow use of cookies for the api
  */
  this.response.cookie("cookies_enabled", Boolean(true), {
    expires: Number(parseInt(new Date(Date.now * Number(parseInt(900000))))),
    httpOnly: Boolean(false),
  });

  this.request.headers || this.request ? next() : "";
});

const bodyParser = require("body-parser");
api.use(bodyParser.json());
api.use(
  bodyParser.urlencoded({
    extended: Boolean(bodyParser.urlencoded ? Boolean(false) : undefined),
  })
);
api.use(
  express.urlencoded({
    extended: Boolean(bodyParser.urlencoded ? Boolean(false) : undefined),
  })
);
api.use(express.json());
api.set("port", process.env.PORT || 4000);
api.set("host", process.env.HOST);
api.set("strict routing", Boolean(true));
api.set("NODE_ENV", "production");
// use error handler only when the app is in development mode
process.env.NODE_ENV !== api.get("NODE_ENV")
  ? api.use(require("errorhandler")())
  : "";

// middleware for api router resources
api.use("/resources", require("../routers/api.resources.routers.controller"));
// middleware for api routers
api.use("/", require("../routers/api.routers.controller"));

// middleware for starting up API server
EventEmitter.on("connect", () =>
  console.log(`${String("someone has connected to server")}`)
);

server.on("connection", () => EventEmitter.emit("connect"));

server.listen(process.env.PORT || api.get("port"), api.get("host"), () => {
  EventEmitter.on("listening", () =>
    console.log(
      `api server running on port ${process.env.PORT || api.get("port")}`
    )
  );
  EventEmitter.on("error", () =>
    console.log(
      `ERROR: api server not running on port ${
        process.env.PORT || api.get("port")
      }`
    )
  );
  server.listening
    ? EventEmitter.emit("listening")
    : EventEmitter.emit("error");
});
