const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');
const bcrypt = require('bcrypt');
const { sendSMS } = require('../twilio');


router.post('/tempsupplierregister', upload.single('image'), async (req, res) => {
    const { name, email, phone, address, bankAccount, ifscCode, adharNumber, password } = req.body;
    const image = req.file ? req.file.filename : null;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otp_end_time = new Date();
    otp_end_time.setMinutes(otp_end_time.getMinutes() + 5);


    // Check if the email is already registered
    con.query('SELECT * FROM supplier_authentications WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error('Error checking existing email:', error);

            return res.status(500).json({ message: 'Error registering user' });
        }
        console.log("sent")
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }


        // Insert user data into the supplier_details table
        const insertUserQuery = 'INSERT INTO temp_supplier_details (name, email, phone, address, bank_account, ifsc_code, adhar_number, image, otp, otp_end_time, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        con.query(
            insertUserQuery,
            [name, email, phone, address, bankAccount, ifscCode, adharNumber, image, otp, otp_end_time, hashedPassword],
            async (insertError, insertResults) => {
                if (insertError) {
                    console.error('Error inserting user data:', insertError);
                    return res.status(500).json({ message: 'Error registering user' });
                }
                const userId = insertResults.insertId;
                res.status(200).json({ message: 'User registered successfully!', userId, phone });

                // Send OTP to the user's phone number
                const recipientNumber = '+91' + phone; // Assuming phone number format is '+918105356165'
                const otpMessage = `Your OTP for registration is: ${otp}`;
                try {
                   sendSMS(recipientNumber, otpMessage);
                    console.log('OTP sent successfully to', recipientNumber);
                } catch (error) {
                    console.error('Failed to send OTP:', error);
                }


            }
        );
    });
});

module.exports = router;