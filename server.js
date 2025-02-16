// server.js

// Import required modules
const express = require('express'); // Import the Express framework
const cors = require('cors'); // Import the CORS middleware to handle cross-origin requests
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies

// Create an instance of Express
const app = express();

// Import the combined API controller from the controllerAPI folder
const apiController = require('./controllerAPI/api-controller');

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON request bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Use the combined API controller for all routes under /api
app.use('/api', apiController);

// Start the server on port 3060 and log a message once it's running
app.listen(3060, () => {
    console.log("Server up and running on port 3060");
});
