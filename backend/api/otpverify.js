const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');
const bcrypt = require('bcrypt');
const { sendSMS } = require('../utils/sendmessage');

// Assuming you have already established a MySQL connection and imported necessary modules

// ... (your other imports and routes)

// ... (your other imports and routes)

router.post('/supplierotpverify', async (req, res) => {
    const { id, otp } = req.body;

    // Check if the provided OTP matches the stored OTP for the given ID in temp_supplier_details table
    const selectQuery = 'SELECT * FROM temp_supplier_details WHERE id = ?';
    con.query(selectQuery, [id], async (selectError, selectResults) => {
        if (selectError) {
            console.error('Error selecting OTP:', selectError);
            return res.status(500).json({ message: 'Error verifying OTP' });
        }

        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Time out please try again' });
        }

        const storedOTP = selectResults[0].otp;
        if (parseInt(otp) === storedOTP) {
            // If OTP matches, proceed with transferring data to supplier_details and supplier_Authentications
            const userData = selectResults[0];
            const { name, email, phone, address, bank_account, ifsc_code, adhar_number, image, password } = userData;

            // Transfer data to supplier_details table
            const insertDetailsQuery = 'INSERT INTO supplier_details (name, email, phone, address, bank_account, ifsc_code, adhar_number, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            con.query(
                insertDetailsQuery,
                [name, email, phone, address, bank_account, ifsc_code, adhar_number, image],
                async (insertDetailsError, insertDetailsResults) => {
                    if (insertDetailsError) {
                        console.error('Error inserting data into supplier_details:', insertDetailsError);
                        return res.status(500).json({ message: 'Error transferring data' });
                    }

                    const supplierDetailsId = insertDetailsResults.insertId;

                    // Transfer data to supplier_Authentications table
                    const insertAuthQuery = 'INSERT INTO supplier_Authentications (supplier_id, email, password_hash) VALUES (?, ?, ?)';
                    con.query(insertAuthQuery, [supplierDetailsId, email, password], async (insertAuthError, insertAuthResults) => {
                        if (insertAuthError) {
                            console.error('Error inserting data into supplier_Authentications:', insertAuthError);
                            return res.status(500).json({ message: 'Error transferring data' });
                        }

                        // Delete transferred data from temp_supplier_details
                        const deleteQuery = 'DELETE FROM temp_supplier_details WHERE id = ?';
                        con.query(deleteQuery, [id], (deleteError, deleteResults) => {
                            if (deleteError) {
                                console.error('Error deleting data from temp_supplier_details:', deleteError);
                                return res.status(500).json({ message: 'Error deleting data' });
                            }

                            res.status(200).json({ success: true, message: 'Data transferred and deleted successfully' });
                        });
                    });
                }
            );
        } else {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
    });
});

module.exports = router;
