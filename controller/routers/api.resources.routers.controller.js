"use strict";
const express = require("express");
const router = express.Router();

router.route("/").get((request, response) => {
  this.response = response;
  this.request = request;
  this.response.statusCode = Number(200);
  this.response.contentType = "application/json";

  this.response.status(Number(parseInt(200))).jsonp({
    message: "This api provides a couple of resources served during fetching!",
    resources: {
      photos: JSON.stringify(Number(parseInt(30))),
      users: JSON.stringify(Number(parseInt(25))),
      texts: JSON.stringify(Number(parseInt(10))),
      posts: JSON.stringify(Number(parseInt(50))),
    },
  });
});

/*
    routers for all api resources handlers
*/

// -*users resource routes
router.use("/users", require("./resources/api.users.resources.handler"));
// -*photos resources routes
router.use("/photos", require("./resources/api.photos.resources.handler"));
// -*texts resources routes
router.use("/texts", require("./resources/api.texts.resources.handler"));
// -*posts resources routes
router.use("/posts", require("./resources/api.posts.resources.handler"));

// send a 404 response for undefined queries or routes
router.use(require("../middleware/error/404.middleware.handler"));
module.exports = router;
