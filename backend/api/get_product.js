const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');

router.post('/getproduct', (req, res) => {
    const productId = req.body.p_id;
  
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required in the request body.' });
    }
  
    const query = 'SELECT * FROM products WHERE product_id = ?';
    con.query(query, [productId], (error, results) => {
      if (error) {
        console.error('Error fetching product data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Product not found.' });
      }  
      
      // Replace \n with <br> for the 'about' column
      const productData = results[0];
      productData.about = productData.about.replace(/\n/g, '<br>');
      console.log("sending")
      return res.status(200).json({ product: productData });
    });
});

module.exports = router;
