// database.js

// Import MySQL2 module to interact with the MySQL database
const mysql = require('mysql2');
// Import the database details from db-details.js
const dbDetails = require('./db-details');

// Export the function to establish a connection to the MySQL database
module.exports = {
    getConnection: () => {
        // Return a new connection using the database details
        return mysql.createConnection({
            host: dbDetails.host,
            user: dbDetails.user,
            password: dbDetails.password,
            database: dbDetails.database
        });
    }
};
