// Import necessary modules
const express = require('express');
const router = express.Router();
const { con } = require('../common/dbconnection');

router.post('/getfatprice', (req, res) => {
    const { fat_content, supplierId } = req.body;
    console.log(fat_content)
    console.log(supplierId)

    // Check if the supplier exists
    const supplierQuery = 'SELECT * FROM supplier_details WHERE id = ?';
    con.query(supplierQuery, [supplierId], (supplierErr, supplierResults) => {
        if (supplierErr) {
            console.error('Error checking supplier details:', supplierErr);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (supplierResults.length === 0) {
                res.status(200).json({ error: 'Supplier not found' });
            } else {
                const supplierName = supplierResults[0].name;

                // If the supplier exists, fetch the amount
                const query = 'SELECT amount FROM milk_price WHERE fat_content = ?';
                con.query(query, [fat_content], (err, results) => {
                    if (err) {
                        console.error('Error fetching amount from database:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        if (results.length === 0) {
                            res.status(404).json({ error: 'Price not found for the specified fat content' });
                        } else {
                            const price = results[0].amount;
                            console.log(price)
                            // Include supplier name in the response
                            res.status(200).json({ price, supplierName });
                        }
                    }
                });
            }
        }
    });
});

router.post('/addmilk', (req, res) => {
    const { supplierId, fat_content, quantityInLtr, totalAmount } = req.body;
  
    // Assuming you have access to a MySQL database connection
    // Adjust the SQL query according to your needs
    const insertQuery = `
      INSERT INTO milk_collection 
      (supplier_id, collected_date, fat_content, quantity_liter, collection_time, amount, payment_status) 
      VALUES 
      (?, CURDATE(), ?, ?, ?, ?, 'not done')
    `;
  
    // Assuming you're using a MySQL library, for example 'mysql2'
    // Make sure to handle errors and responses appropriately
    con.query(insertQuery, [supplierId, fat_content, quantityInLtr, determineCollectionTime(), totalAmount], (error, results) => {
      if (error) {
        console.error('Error inserting into milk_collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Data inserted successfully:', results);
        res.status(200).json({ success: true });
      }
    });
  });
  
  // Helper function to determine collection_time based on Indian time
  function determineCollectionTime() {
    const currentHour = new Date().getHours();
    return currentHour >= 0 && currentHour < 12 ? 'morning' : 'evening';
  }

// Export the router
module.exports = router;
