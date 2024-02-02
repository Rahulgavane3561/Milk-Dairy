// Import necessary modules
const express = require('express');
const router = express.Router();
const { con } = require('../common/dbconnection');

router.get('/getOrderDetails/:orderId', (req, res) => {
  const orderId = req.params.orderId;

  con.query('SELECT * FROM sales WHERE sale_id = ?', [orderId], (error, results) => {
    if (error) {
      console.error('Error fetching order details:', error);
      return res.status(500).json({ message: 'Error fetching order details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const orderDetails = results[0];

    con.query('SELECT name FROM supplier_details WHERE id = ?', [orderDetails.supplier_id], (supplierError, supplierResults) => {
      if (supplierError) {
        console.error('Error fetching supplier details:', supplierError);
        return res.status(500).json({ message: 'Error fetching supplier details' });
      }

      if (supplierResults.length > 0) {
        orderDetails.supplier_name = supplierResults[0].name;
      }

      con.query('SELECT product_name FROM products WHERE product_id = ?', [orderDetails.product_id], (productError, productResults) => {
        if (productError) {
          console.error('Error fetching product details:', productError);
          return res.status(500).json({ message: 'Error fetching product details' });
        }

        if (productResults.length > 0) {
          orderDetails.product_name = productResults[0].product_name;
        }

        res.status(200).json(orderDetails);
      });
    });
  });
});

module.exports = router;
