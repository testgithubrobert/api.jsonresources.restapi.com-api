"use strict";
const mysql2 = require("mysql2");
// configure dotenv for secrete keys accession
require("dotenv").config();
require("dotenv").configDotenv();

// make pool connection to db
const pool_connection = mysql2.createPool({
    database: process.env.DB,
    password: process.env.DB_CONNECTION_PASSWORD,
    host: process.env.DB_HOST,
    user: process.env.DB_USER
});

try {
    // get any connection to a specified database
    pool_connection.getConnection((error, connection) => {
        if(error) {
            return console.log(error.message);
        } else {
            return console.log("Connected to db successfully!");
        }
    });
} catch (error) {
    return console.log(`ERROR WHILE CONNECTING TO DB: ${error.message}`);
}

/* export the promise pool connection function to provide asynchronous
pool connections to the db */
module.exports = pool_connection.promise();