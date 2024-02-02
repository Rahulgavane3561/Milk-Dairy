const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

router.post('/supplier_login', (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    const query = `SELECT * FROM supplier_authentications WHERE email = ?`;
    con.query(query, [email], async (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Database error' });
            console.log("Database error");
            return;
        }
        if (results.length === 0) {
            return res.status(200).json({ status: 'not-found', message: 'Password updated successfully' });
        }
        const hashedPassword = results[0].password_hash;
        const isValidPassword = await bcrypt.compare(password, hashedPassword);
        if (!isValidPassword) {
            // res.status(401).json({ message: 'Invalid credentials' });
            console.log("Invalid credentials");
            return res.status(200).json({ status: 'invalid', message: 'Password updated successfully' });
        }
        
        const user = {
            id: results[0].supplier_id,
            email: results[0].email
        };
        // token generation
        const token = jwt.sign(user, 'jwT3xp$ecrEtK3y!f0rPr0ducT10n', { expiresIn: '1h' });
        res.json({ token }); // Send the generated token to the frontend
    });
});

module.exports = router;