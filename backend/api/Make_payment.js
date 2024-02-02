const express = require('express');
const router = express.Router();
const { con } = require('../common/dbconnection');
const stripe = require('stripe')('sk_test_51OavxzSDboyJWBIQfqPu4djpPzUkJuWDJzGjKFfAveU9MLHex5v6z8RSyNcTsafFvT1U60hh0fHtqfpWL1X2YSx000zy8D5V4a');

router.post("/getpayment", (req, res) => {
  try {
    const { token, amount, paymentOption, cardNumber, cardholderName, expiryMonth, expiryYear, cvv, quantity, supplierId, ProductId } = req.body;
    const currentDate = new Date().toISOString().split('T')[0];

    if (paymentOption === "card") {
      // Perform card payment processing logic here
      // Add appropriate error handling and response
    }

    const insertSalesQuery = `
      INSERT INTO sales (supplier_id, product_id, quantity_sold, total_amount, sale_date, status_collected)
      VALUES (?, ?, ?, ?, ?, 'not_collected');
    `;

    con.beginTransaction((err) => {
      if (err) {
        console.error("Error starting transaction:", err);
        return res.status(500).json({ success: false, message: "Error processing payment" });
      }

      con.query(insertSalesQuery, [supplierId, ProductId, quantity, amount, currentDate], (error, results) => {
        if (error) {
          console.error("Error inserting data into sales table:", error);
          con.rollback(() => {
            res.status(500).json({ success: false, message: "Error processing payment" });
          });
        } else {
          const updateProductQuantityQuery = `
            UPDATE products
            SET quantity = GREATEST(quantity - ?, 0)
            WHERE product_id = ?;
          `;

          con.query(updateProductQuantityQuery, [quantity, ProductId], (updateError, updateResults) => {
            if (updateError) {
              console.error("Error updating product quantity:", updateError);
              con.rollback(() => {
                res.status(500).json({ success: false, message: "Error processing payment" });
              });
            } else {
              con.commit((commitError) => {
                if (commitError) {
                  console.error("Error committing transaction:", commitError);
                  con.rollback(() => {
                    res.status(500).json({ success: false, message: "Error processing payment" });
                  });
                } else {
                  res.status(200).json({ success: true, message: "Payment processed successfully" });
                }
              });
            }
          });
        }
      });
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ success: false, message: "Error processing payment" });
  }
});

module.exports = router;
