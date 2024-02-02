// Import necessary modules
const express = require('express');
const router = express.Router();
const { con } = require('../common/dbconnection');

// API endpoint to fetch products
router.post('/varificationcode', (req, res) => {
    const expectedVerificationCode = '356165'; 
    const { inputValue } = req.body;
    console.log(inputValue)
    
    if (inputValue === expectedVerificationCode) {
        console.log("sent")
      res.status(200).json({ success: true, message: 'Verification successful' });
    } else { console.log("error")
      res.status(200).json({ success: false, message: 'Invalid verification code' });
    }
  });

// Export the router
module.exports = router;
