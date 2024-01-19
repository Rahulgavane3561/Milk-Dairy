// Import necessary modules
const express = require('express');
const router = express.Router();
const { con } = require('../common/dbconnection');

// API endpoint to fetch products
router.post('/getproducts', (req, res) => {

  // Query the database to get all products
  con.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ message: 'Error fetching products' });
    }

    console.log("sending products");
    res.status(200).json({ Status: 'Success', Result: results });
  });
});

// Export the router
module.exports = router;
