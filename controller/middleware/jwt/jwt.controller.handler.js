"use strict";
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("dotenv").configDotenv();

// check and authorize tokens for accessing resources
async function JWT(request, response, next) {
  response.setHeader("Content-Type", "Application/json");
  response.statusCode = 200;

  try {
    // retrieve a token from the authorization headers
    const authorizationHeaders = request.headers["authorization"];
    let token = authorizationHeaders.split(" ")[1]; // split authorization headers to get token

    if (!token || typeof token === "undefined") {
      response
        .status(401)
        .json({
          message: `ERROR ${response.statusCode}: Unauthorized, signup for a json web token to get access!`,
        });
      return;
    } else if (jwt.decode(token) === null) {
      // decode the token
      response
        .status(400)
        .json({
          message: `ERROR ${response.statusCode}: Token verification failed!`,
        });
      return;
    } else {
      // verify toke if its not === null
      jwt.verify(
        token,
        "49dadd17-4e25-42a2-8d3a-2deb34f074fe",
        (error, user) => {
          request.body.username = request ? user : "";
          next();
        }
      );
    }
  } catch (error) {
    response
      .status(500)
      .jsonp(
        request
          ? {
              message: `ERROR ${response.statusCode}: JWT token tempered with or not available!`,
            }
          : ""
      );
    return;
  }
}

module.exports = JWT;
