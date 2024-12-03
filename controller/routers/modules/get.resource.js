"use strict";
let DBMSPool_connection = require("../../../model/connection/api.model.pool.connection");

module.exports = async (request, response, table) => {
  this.response = response;

  this.response.statusCode = Number(parseInt(200));
  this.response.setHeader("Content-Type", "application/json");
  this.response.setHeader("Access-Control-Allow-Method", "GET");
  this.response.contentType = "application/json";

  // handler and catch all api server errors to prevent app crush
  try {
    // query all users available resources from db
    const _resources = await DBMSPool_connection.query(
      `SELECT * FROM ${table}`
    );

    // filter out the corresponding or co-existing resource with requested id
    let FoundResource = _resources[0].find((resource) => {
      return resource.id === request.params.id;
    });

    if ((request && !FoundResource) || typeof FoundResource === "undefined") {
      return this.response.status(404).json({
        Message: `Requested resource with id ${JSON.stringify(
          request.params.id
        )} not found!`,
      });
    } else
      return this.response.status(Number(parseInt(200))).jsonp(
        FoundResource
          ? FoundResource
          : {
              Message: `Requested resource with id ${JSON.stringify(
                request.params.id
              )} not found!`,
            }
      );
  } catch (error) {
    // console.log(error);
    return this.response
      .status(Number(parseInt(200)))
      .json(
        "body" in request ? { ERROR: error.message } : { ERROR: error.message }
      );
  }
};
