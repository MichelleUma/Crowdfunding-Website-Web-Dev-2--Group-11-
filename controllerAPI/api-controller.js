// Import required modules
const express = require('express'); // Express framework for building APIs
const dbcon = require('../database'); // Import the database connection utility
const connection = dbcon.getConnection(); // Get the MySQL connection

// Establish connection to MySQL database
connection.connect();

// Initialize Express Router
const router = express.Router();

// --- Fundraisers ---

// API to get all fundraisers or filter by category
router.get('/fundraisers', (req, res) => {
    const { categoryId } = req.query; // Get categoryId from the query string
    let query = 'SELECT * FROM FUNDRAISER'; // Base query to select all fundraisers

    // If categoryId is provided, filter the results
    if (categoryId) query += ' WHERE CATEGORY_ID = ?';

    // Execute the query and handle the response
    connection.query(query, categoryId ? [categoryId] : [], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' }); // Handle database errors
        res.json(results); // Send results as JSON
    });
});

// API to get fundraiser details by ID along with donations
router.get('/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id; // Extract fundraiser ID from URL
    const fundraiserQuery = 'SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';
    const donationQuery = 'SELECT * FROM DONATION WHERE FUNDRAISER_ID = ?';

    // Fetch fundraiser details
    connection.query(fundraiserQuery, [fundraiserId], (err, fundraiserResult) => {
        if (err) return res.status(500).json({ message: 'Server error' }); // Handle errors

        if (fundraiserResult.length > 0) {
            // Fetch donations linked to the fundraiser
            connection.query(donationQuery, [fundraiserId], (err, donationsResult) => {
                if (err) return res.status(500).json({ message: 'Server error' });

                res.json({
                    fundraiser: fundraiserResult[0], // Return fundraiser details
                    donations: donationsResult // Return linked donations
                });
            });
        } else {
            res.status(404).json({ message: 'Fundraiser not found' }); // Handle fundraiser not found
        }
    });
});

// API to create a new fundraiser
router.post('/fundraiser', (req, res) => {
    // Extracting the fundraiser details from the request body
    const { caption, organizer, targetFunding, currentFunding, city, categoryId } = req.body;

    // SQL query to insert a new fundraiser
    const query = 'INSERT INTO FUNDRAISER (CAPTION, ORGANIZER, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID) VALUES (?, ?, ?, ?, ?, ?)';

    // Execute the query
    connection.query(query, [caption, organizer, targetFunding, currentFunding, city, categoryId], (err) => {
        if (err) return res.status(500).json({ message: 'Server error' }); // Handle errors
        res.json({ message: 'Fundraiser added successfully' }); // Success response
    });
});

// API to update an existing fundraiser
router.put('/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id; // Extract fundraiser ID from the URL
    const { caption, organizer, targetFunding, currentFunding, city, categoryId } = req.body; // Destructure updated fundraiser details from request body

    // SQL query to update a fundraiser
    const query = 'UPDATE FUNDRAISER SET CAPTION = ?, ORGANIZER = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?';

    // Execute the query
    connection.query(query, [caption, organizer, targetFunding, currentFunding, city, categoryId, fundraiserId], (err) => {
        if (err) return res.status(500).json({ message: 'Server error' }); // Handle errors
        res.json({ message: 'Fundraiser updated successfully' }); // Success response
    });
});

// API to delete a fundraiser
router.delete('/fundraiser/:id', (req, res) => {
    const fundraiserId = req.params.id; // Extract fundraiser ID from the URL

    // SQL query to check if any donations are linked to the fundraiser
    const checkDonationsQuery = 'SELECT COUNT(*) AS donationCount FROM DONATION WHERE FUNDRAISER_ID = ?';

    // Execute the query to check donations
    connection.query(checkDonationsQuery, [fundraiserId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Server error' }); // Handle errors
        if (results[0].donationCount > 0) return res.status(400).json({ message: 'Cannot delete fundraiser with existing donations' });

        // SQL query to delete the fundraiser
        const deleteQuery = 'DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';

        // Execute the delete query
        connection.query(deleteQuery, [fundraiserId], (err) => {
            if (err) return res.status(500).json({ message: 'Server error' });
            res.json({ message: 'Fundraiser deleted successfully' }); // Success response
        });
    });
});

// --- Donations ---

// API to create a new donation
router.post('/donation', (req, res) => {
    const { amount, giver, fundraiser_id } = req.body; // Extract donation details from request body
    const query = 'INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (NOW(), ?, ?, ?)'; // SQL query to insert a donation

    // Execute the query
    connection.query(query, [amount, giver, fundraiser_id], (err) => {
        if (err) return res.status(500).json({ message: 'Server error' }); // Handle errors
        res.json({ message: 'Donation added successfully' }); // Success response
    });
});

// --- Categories ---

// API to get all categories
router.get('/categories', (req, res) => {
    const query = 'SELECT * FROM CATEGORY'; // SQL query to fetch all categories

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message }); // Handle errors
        res.json(results); // Return categories as JSON
    });
});



//API to get all fundraisers
router.get('/fundraisers', (req, res) => {
    const query = 'SELECT * FROM FUNDRAISER'; // SQL query to fetch all categories

    // Execute the query
    connection.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message }); // Handle errors
        res.json(results); // Return categories as JSON
    });
});


// Export the router to be used in server.js
module.exports = router;
