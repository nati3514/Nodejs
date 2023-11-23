// Import the express module
const express = require("express");

// Create an instance of the express application
const app = express();

// Define a middleware function that will run for every request
app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

// Define a middleware function that will run for requests to the "/add-product" path
app.use("/add-product", (req, res, next) => {
  console.log("In another middleware 1");
  res.send('<h1>The "Add Product" Page</h1>');
});

// Define another middleware function that will run for requests to the "/" path
app.use("/", (req, res, next) => {
  console.log("In another middleware 2");
  res.send("<h1>Hello from Express!</h1>");
});

// Start the server and listen on port 3000
app.listen(3000);

//
//In this code, we have an Express server that listens on port 3000. The server has three middleware functions. The first middleware function runs for every request, regardless of the path. It simply logs a message to the console and calls the `next()` function to proceed to the next middleware function.
//
//The second middleware function runs for requests to the "/add-product" path. It logs a message to the console and sends an HTML response to the client.
//
//The third middleware function als
