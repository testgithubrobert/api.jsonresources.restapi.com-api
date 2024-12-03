"use strict";
const express = require("express");
const router = express.Router();

router.route("/").get((request, response) => {
  this.response = response;
  this.request = request;
  this.response.contentType = "application/json";

  this.response
    .status(Number(parseInt(200)))
    .jsonp({ message: "Welcome to json resources api!" });
});

// handle api information, terms and privacy...
var ApiInformation = require("../../model/json/api.information.json");

// serve information about api
router.route("/about-api").get((request, response) => {
  this.response = response;
  this.request = request;
  this.response.statusCode = Number(200);
  this.response.contentType = "application/json";

  this.request && Object.is(ApiInformation.about_api, ApiInformation.about_api)
    ? this.response.status(Number(parseInt(200))).json(ApiInformation.about_api)
    : "";
});

// serve information about api privacy
router.route("/privacy").get((request, response) => {
  this.response = response;
  this.request = request;
  this.response.statusCode = Number(200);
  this.response.contentType = "application/json";

  this.request &&
  Object.is(ApiInformation["privacy"], ApiInformation["privacy"])
    ? this.response
        .status(Number(parseInt(200)))
        .json(ApiInformation["privacy"])
    : "";
});

// serve information about api terms
router.route("/terms").get((request, response) => {
  this.response = response;
  this.request = request;
  this.response.statusCode = Number(200);
  this.response.contentType = "application/json";

  this.request && Object.is(ApiInformation["terms"], ApiInformation["terms"])
    ? this.response.status(Number(parseInt(200))).json(ApiInformation["terms"])
    : "";
});

// send a 404 response for undefined queries or routes
router.use(require("../middleware/error/404.middleware.handler"));
module.exports = router;
