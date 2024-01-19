// Import necessary modules
const express = require('express');
const router = express.Router();
const { con } = require('../common/dbconnection');

// API endpoint to fetch supplier details by ID
router.get('/getsupplier/:id', (req, res) => {
  const supplierId = req.params.id;
  console.log(supplierId)
//   console.log("some")

  // Query the database to get supplier details based on the ID
  con.query('SELECT * FROM supplier_details WHERE id = ?', [supplierId], (error, results) => {
    if (error) {
      console.error('Error fetching supplier details:', error);
      return res.status(500).json({ message: 'Error fetching supplier details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const supplierDetails = results[0];
    console.log(supplierDetails)
  
    res.status(200).json(supplierDetails);
  });
});


// Export the router
module.exports = router;
