// Importing the modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// Creating an instance of express
const app = express();

// Middleware to enable CORS
app.use(cors());

//to parse URL-encoded & JSON data 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//to serve static files
app.use(express.static(__dirname));

//route to serve home.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

//route to serve search_fundraisers.html
app.get("/search_fundraisers", (req, res) => {
    res.sendFile(path.join(__dirname, "search_fundraisers.html"));
});

//route to serve fundraiser.html
app.get("/fundraiser", (req, res) => {
    res.sendFile(path.join(__dirname, "fundraiser.html"));
});

//route to serve donation.html
app.get("/donation", (req, res) => {
    res.sendFile(path.join(__dirname, "fundraiser.html"));
});

// Starting the server and listening on port 8080
app.listen(8080, () => {
    console.log("Server is up and running on Port 8080");
});