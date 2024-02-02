// Import necessary modules
const express = require('express');
const router = express.Router();
const { con } = require('../common/dbconnection');

// API endpoint to fetch supplier details by ID
router.post('/getmilkdata', async (req, res) => {
    try {
        // Set timezone to Indian Standard Time (IST)
        const todayDate = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' }).split(',')[0];
        const currentHour = new Date().getHours();
        const isMorning = currentHour >= 0 && currentHour < 12;

        const formattedDate = todayDate.split('/').reverse().join('-');
        const query = `
        SELECT mc.*, sd.name
        FROM milk_collection mc
        INNER JOIN supplier_details sd ON mc.supplier_id = sd.id
        WHERE DATE(mc.collected_date) = ? 
        AND mc.collection_time = ?
        ORDER BY mc.collection_id DESC`;

        const aggregateValuesQuery = `
      SELECT 
      COUNT(*) AS numberOfRows,
        SUM(mc.quantity_liter) AS totalQuantity,
        AVG(mc.fat_content) AS averageFatContent,
        SUM(mc.amount) AS totalAmount,
        ? AS todayDate
      FROM milk_collection mc
      INNER JOIN supplier_details sd ON mc.supplier_id = sd.id
      WHERE DATE(mc.collected_date) = ?;
    `;
        const [rows, fields] = await con.promise().query(query, [formattedDate, isMorning ? 'morning' : 'evening']);
        const [aggregateValues, aggregateValuesFields] = await con.promise().query(aggregateValuesQuery, [formattedDate, formattedDate]);
        console.log(currentHour)
        res.json({ rows, aggregateValues: aggregateValues[0] });
    } catch (error) {
        console.error('Error fetching milk data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/deletemilkData', async (req, res) => {
    try {
        const { collection_id } = req.body;

        if (!collection_id) {
            return res.status(400).json({ success: false, error: 'collection_id is required' });
        }

        // SQL query to delete the row from milk_collection table
        const deleteQuery = `DELETE FROM milk_collection WHERE collection_id = ?`;

        // Execute the query using your MySQL connection
        const [result] = await con.promise().query(deleteQuery, [collection_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, error: 'Data not found' });
        }

        return res.json({ success: true, message: 'Data deleted successfully' });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


router.post('/getpriviousdata', async (req, res) => {
    const query = `
    SELECT
      collected_date,
      SUM(quantity_liter) AS total_quantity,
      SUM(amount) AS total_amount,
      AVG(fat_content) AS average_fat_content,
      COUNT(*) AS number_of_rows
    FROM milk_collection
    GROUP BY collected_date
    ORDER BY collected_date DESC
  `;
    con.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching milk data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.json({ rows: results });
    });

});


// Export the router
module.exports = router;
