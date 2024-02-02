const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');



router.get('/milkCollectionData/:supplierId', (req, res) => {
    const { supplierId } = req.params;
    const { fromDate, toDate } = req.query;
   
    // Query to retrieve milk collection data based on supplierId and date range
    let query = `SELECT * FROM milk_collection WHERE supplier_id = ?`;

    const queryParams = [supplierId];

    // If fromDate and toDate are provided, add date range conditions to the query
    if (fromDate && toDate) {
        query += ` AND collected_date BETWEEN ? AND ?`;
        queryParams.push(fromDate, toDate);
    }

    // Execute the query with parameters
    con.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Error fetching data' });
            return;
        }
        res.status(200).json(results);
    });
});
module.exports = router;
