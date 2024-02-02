const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');

router.get('/sales/:supplier_id', (req, res) => {
    const supplierId = req.params.supplier_id;
    // console.log(supplierId)
  
    // Query to fetch sales data with product_name joined from products table
    const query = `
      SELECT sales.sale_id, sales.sale_date, sales.quantity_sold, sales.total_amount, sales.status_collected, products.product_name,products.image_link
      FROM sales
      INNER JOIN products ON sales.product_id = products.product_id
      WHERE sales.supplier_id = ?
    `;
  
    con.query(query, [supplierId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  module.exports = router;