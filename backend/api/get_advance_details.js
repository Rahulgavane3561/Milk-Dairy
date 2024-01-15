const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');

router.get('/advanced_amount/:supplierId', async (req, res) => {
  try {
    const { supplierId } = req.params;

    const advanceAmountQuery = `
      SELECT id, date, amount
      FROM advance_amount
      WHERE supplier_id = ?
    `;

    const advanceAmounts = await new Promise((resolve, reject) => {
      con.query(advanceAmountQuery, [supplierId], (error, results) => {
        if (error) {
          console.error('Error fetching advance amounts:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    const dataPromises = advanceAmounts.map(async (advance) => {
        try {
          const givenBackQuery = `
            SELECT returned_amount, date
            FROM advance_given_back
            WHERE advance_id = ?
          `;
          
          const givenBack = await new Promise((resolve, reject) => {
            con.query(givenBackQuery, [advance.id], (error, results) => {
              if (error) {
                console.error('Error fetching given back amounts:', error);
                reject(error);
              } else {
                resolve(results);
              }
            });
          });
      
          const totalReturned = givenBack.reduce((acc, { returned_amount }) => acc + parseFloat(returned_amount), 0);
const pending = parseFloat(advance.amount) - totalReturned;
console.log(parseFloat(advance.amount));
console.log(totalReturned);

          return { advance, pending, givenBack };
        } catch (error) {
          console.error('Error in fetching advance data:', error);
          throw error;
        }
      });
      
      

    const result = await Promise.all(dataPromises);
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
