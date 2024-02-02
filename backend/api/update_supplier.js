const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');


router.put('/updatesupplier/:supplierId', upload.single('image'), async (req, res) => {
    const userId = req.params.supplierId;
    const { name, email, phone, address, bankAccount, ifscCode, adharNumber} = req.body;
    const image = req.file ? req.file.filename : null;
    
    const updateUserQuery = `
        UPDATE supplier_details
        SET name=?, email=?, phone=?, address=?, bank_account=?, ifsc_code=?, adhar_number=?, image=?
        WHERE id=?
    `;
    
    con.query(
        updateUserQuery,
        [name, email, phone, address, bankAccount, ifscCode, adharNumber, image, userId],
        async (updateError, updateResults) => {
            if (updateError) {
                console.error('Error updating user data:', updateError);
                return res.status(500).json({ message: 'Error updating user' });
            }
            console.log("updated")
            res.status(200).json({ message: 'User updated successfully!', userId, phone });
        }
    );
});

module.exports = router;
