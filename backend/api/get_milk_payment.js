const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');

router.get('/milkCollectionByMonth/:supplierId', (req, res) => {
    try {
      const { supplierId } = req.params;
      console.log(supplierId)
      con.query(`
  SELECT groupMonth,
    payment_status,
    SUM(amount) AS totalAmount
  FROM (
    SELECT DATE_FORMAT(collected_date, '%Y-%m') AS groupMonth,
      payment_status,
      amount
    FROM milk_collection
    WHERE supplier_id = ?
  ) AS subquery
  GROUP BY groupMonth, payment_status
`, [supplierId], (error, results) => {
 
        if (error) {
          console.error('Error fetching grouped milk collection:', error);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json(results);
        }
      });
      // Rest of the code handles the query execution and response handling
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;