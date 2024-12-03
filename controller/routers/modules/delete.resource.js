"use strict";
let DBMSPool_connection = require("../../../model/connection/api.model.pool.connection");

module.exports = async (request, response, table) => {
  this.response = response;

  this.response.statusCode = Number(parseInt(200));
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Method", "DELETE");
  this.response.contentType = "application/json";

  // handler and catch all api server errors to prevent app crush
  try {
    // query all texts available resources from db
    const _resources = await DBMSPool_connection.query(
      `SELECT * FROM ${table}`
    );

    // filter out the corresponding or co-existing duplicate resource with the request from the db
    let FoundResource = _resources[0].find((resource) => {
      return resource.id === request.params.id;
    });

    if ((request && !FoundResource) || typeof FoundResource === "undefined") {
      return this.response.status(Number(parseInt(404))).json({
        Message: `Requested resource with id ${JSON.stringify(
          request.params.id
        )} not found!`,
      });
    } else {
      // send response on successful resource deletion operation buh no saving to db
      return this.response
        .status(Number(parseInt(200)))
        .jsonp(
          "body" in request
            ? { Message: `Deleted resource with id ${FoundResource.id}` }
            : ""
        );
    }
  } catch (error) {
    // console.log(error);
    return this.response
      .status(Number(parseInt(500)))
      .json(
        "body" in request ? { ERROR: error.message } : { ERROR: error.message }
      );
  }
};
