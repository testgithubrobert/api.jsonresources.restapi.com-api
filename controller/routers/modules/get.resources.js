"use strict";
// let DBMSPool_connection = require("../../../model/connection/api.model.pool.connection");

module.exports = async (request, response, url) => {
  this.response = response;

  this.response.statusCode = Number(parseInt(200));
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Method", "GET");
  this.response.contentType = "application/json";

  // handler and catch all api server errors to prevent app crush
  try {
    // query all users available resources from db
    const _resources = require(`../../../model/json/${url}`)

    if (request && Array.isArray(_resources) && _resources.length < 1) {
      return this.response.json({
        Message: String("There are currently no api resources for this query!"),
      });
    } else
      return this.response.json(
        Array.isArray(_resources) &&
          _resources.length > Number(parseInt(0))
          ? _resources
          : { Message: "There are currently no api resources for this query!" }
      );
  } catch (error) {
    console.log(error);
    return this.response
      .status(Number(parseInt(500)))
      .json(
        "body" in request ? { ERROR: error.message } : { ERROR: error.message }
      );
  }
};
