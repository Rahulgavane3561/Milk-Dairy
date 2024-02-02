const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');

router.get('/MilkData', (req, res) => {
    console.log("got some")
    const { startDate, endDate, supplierId, collectionTime } = req.query;
    console.log(startDate)
    console.log(endDate)
    console.log(supplierId)
    console.log(collectionTime)
  
    let sql = 'SELECT * FROM milk_collection WHERE 1=1';
  
    if (startDate && endDate) {
      sql += ` AND collected_date BETWEEN '${startDate}' AND '${endDate}'`;
    }
  
    if (supplierId) {
      sql += ` AND supplier_id = ${supplierId}`;
    }
  
    if (collectionTime) {
      sql += ` AND collection_time = '${collectionTime}'`;
    }
  
    con.query(sql, (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.json({ data: results });
    });
  });

module.exports = router;
