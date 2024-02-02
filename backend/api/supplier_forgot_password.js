const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { con } = require('../common/dbconnection');
const { sendOtpEmail } = require('../sendEmail'); // Import the function

router.post('/fp_email', async (req, res) => {
    const { email } = req.body;

    // Check if the email exists in the database
    const checkEmailSql = 'SELECT * FROM supplier_authentications WHERE email = ?';
    con.query(checkEmailSql, [email], async (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // Email exists, generate a 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000);

            // Save the OTP in the database (you need to have an 'otp' column in the table)
            const saveOtpSql = 'UPDATE supplier_authentications SET otp = ? WHERE email = ?';
            con.query(saveOtpSql, [otp, email], (saveOtpErr) => {
                if (saveOtpErr) {
                    console.error('Error saving OTP:', saveOtpErr);
                    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
                }

                // Send OTP to the user's email
                sendOtpEmail(email, otp, (sendOtpError) => {
                    if (sendOtpError) {
                        // Handle error
                        return res.status(500).json({ status: 'error', message: 'Error sending OTP email' });
                    }

                    // Send success message to the frontend
                    return res.status(200).json({ status: 'exists', message: 'Email exists, OTP sent successfully' });
                });
            });
        } else {
            // Email not found
            return res.status(200).json({ status: 'not-found', message: 'Email not found' });
        }
    });
});


//  for otp validation 
router.post('/fp_otp', (req, res) => {
    const { email, otp } = req.body;
    console.log(email)

    // Check if the email and OTP match in the database
    const checkOtpSql = 'SELECT * FROM supplier_authentications WHERE email = ? AND otp = ?';
    con.query(checkOtpSql, [email, otp], (err, results) => {
        if (err) {
            console.error('Error checking OTP:', err);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // Valid OTP, you can clear the OTP in the database if needed
            const clearOtpSql = 'UPDATE supplier_authentications SET otp = NULL WHERE email = ?';
            con.query(clearOtpSql, [email], (clearOtpErr) => {
                if (clearOtpErr) {
                    console.error('Error clearing OTP:', clearOtpErr);
                    return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
                }

                return res.status(200).json({ status: 'success', message: 'OTP verified successfully' });
            });
        } else {
            // Invalid OTP
            return res.status(200).json({ status: 'invalid-otp', message: 'Invalid OTP' });
        }
    });
});


//  for password update 

router.post('/fp_password', async (req, res) => {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password in the database
    const updatePasswordSql = 'UPDATE supplier_authentications SET password_hash = ? WHERE email = ?';
    con.query(updatePasswordSql, [hashedPassword, email], (err) => {
        if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }

        return res.status(200).json({ status: 'success', message: 'Password updated successfully' });
    });
});

module.exports = router;
