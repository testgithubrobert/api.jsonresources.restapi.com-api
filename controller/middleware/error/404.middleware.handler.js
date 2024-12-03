"use strict";

async function FourOFourMiddlewareHandler(request, response) {
  response.setHeader("Content-Type", "Application/json");
  response.statusCode = 404;
  response.setHeader("Access-Control-Allow-Origins", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, PATCH, DELETE, POST"
  );
  response.setHeader("Access-Control-Allow-Credentials", true);

  // if there is any unknown route, send a 404 error message
  request.headers || request
    ? global.setTimeout(() => {
        response
          .status(404)
          .json(
            request ? { message: String("ERROR 404: Query Not Found!") } : ""
          );
      }, Number(2000))
    : "";
}

module.exports = FourOFourMiddlewareHandler;
