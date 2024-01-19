const express = require('express');
const router = express.Router();
const { con, upload } = require('../common/dbconnection');
const moment = require('moment');


router.get('/milk-collection/:supplierId', async (req, res) => {
    try {
        const { supplierId } = req.params;

        // Fetch supplier details based on supplierId
        const supplierDetailsQuery = `
            SELECT name, email, phone, adhar_number
            FROM supplier_details
            WHERE id = ?;
        `;

        const [supplierDetails] = await con.promise().query(supplierDetailsQuery, [supplierId]);

        // Fetch current date
        const today = moment();
        let startDate, endDate;

        if (today.date() <= 10) {
            startDate = today.clone().date(1).format('YYYY-MM-DD');
            endDate = today.format('YYYY-MM-DD');
        } else if (today.date() <= 20) {
            startDate = today.clone().date(11).format('YYYY-MM-DD');
            endDate = today.format('YYYY-MM-DD');
        } else {
            startDate = today.clone().date(21).format('YYYY-MM-DD');
            endDate = today.clone().endOf('month').format('YYYY-MM-DD');
        }

        // Fetch milk collection data based on supplier_id and date range
        const milkCollectionQuery = `
            SELECT
                ROUND(SUM(quantity_liter), 1) AS totalQuantity,
                ROUND(AVG(fat_content), 1) AS avgFatContent,
                ROUND(SUM(amount), 1) AS totalAmount
            FROM milk_collection
            WHERE supplier_id = ? AND collected_date BETWEEN ? AND ?;
        `;

        const [milkCollectionResults] = await con.promise().query(milkCollectionQuery, [supplierId, startDate, endDate]);

        // Fetch morning milk details
        const morningMilkQuery = `
            SELECT
                ROUND(SUM(quantity_liter), 1) AS morningTotalQuantity,
                ROUND(AVG(fat_content), 1) AS morningAvgFatContent,
                ROUND(SUM(amount), 1) AS morningTotalAmount
            FROM milk_collection
            WHERE supplier_id = ? AND collection_time = 'morning';
        `;

        const [morningMilkResults] = await con.promise().query(morningMilkQuery, [supplierId]);

        // Fetch evening milk details
        const eveningMilkQuery = `
            SELECT
                ROUND(SUM(quantity_liter), 1) AS eveningTotalQuantity,
                ROUND(AVG(fat_content), 1) AS eveningAvgFatContent,
                ROUND(SUM(amount), 1) AS eveningTotalAmount
            FROM milk_collection
            WHERE supplier_id = ? AND collection_time = 'evening';
        `;

        const [eveningMilkResults] = await con.promise().query(eveningMilkQuery, [supplierId]);

        // fetch total and avg
        const combinedMilkQuery = `
        SELECT
            ROUND(SUM(quantity_liter), 1) AS combinedTotalQuantity,
            ROUND(SUM(amount), 1) AS combinedTotalAmount
             FROM milk_collection
             WHERE supplier_id = ? AND (collection_time = 'morning' OR collection_time = 'evening');
        `;

        const [combinedMilkResults] = await con.promise().query(combinedMilkQuery, [supplierId]);

        // Calculate average amount per liter
        const combinedTotalQuantity = combinedMilkResults[0].combinedTotalQuantity || 1; // Avoid division by zero
        const combinedAvgAmountPerLiter = (combinedMilkResults[0].combinedTotalAmount / combinedTotalQuantity).toFixed(1);


        // Fetch advance amount
        const advanceQuery = `
         SELECT
             SUM(amount) AS totalAdvanceAmount
         FROM advance_amount
         WHERE supplier_id = ?;
     `;

        const [advanceResults] = await con.promise().query(advanceQuery, [supplierId]);
        const totalAdvanceAmount = advanceResults[0].totalAdvanceAmount || 0;

        // Fetch returned amount
        const returnedQuery = `
         SELECT
             SUM(returned_amount) AS totalReturnedAmount
         FROM advance_given_back
         WHERE advance_id IN (
             SELECT id
             FROM advance_amount
             WHERE supplier_id = ?
         );
     `;

        const [returnedResults] = await con.promise().query(returnedQuery, [supplierId]);
        const totalReturnedAmount = returnedResults[0].totalReturnedAmount || 0;

        // Calculate pending amount
        const pendingAmount = totalAdvanceAmount - totalReturnedAmount;

        // Combine the data
        const responseData = {
            recentMilkCollections: milkCollectionResults[0],
            supplierDetails: supplierDetails[0],
            morningMilkDetails: morningMilkResults[0],
            eveningMilkDetails: eveningMilkResults[0],
            combinedMilkDetails: {
                totalAmount: combinedMilkResults[0].combinedTotalAmount,
                avgAmountPerLiter: combinedAvgAmountPerLiter,
            },
            advanceDetails: {
                totalAdvanceAmount: totalAdvanceAmount,
                totalReturnedAmount: totalReturnedAmount,
                pendingAmount: pendingAmount,
            },
        };
        console.log(responseData)
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getusername/:id', async (req, res) => {

    try {
        const userId = req.params.id;
        console.log(userId)

        // Simple query to get user data from the supplier_details table
        // const [rows] = await con.execute('SELECT name, image FROM supplier_details WHERE id = ?', [userId]);
        const userQuery = `
      SELECT
        name, image FROM supplier_details WHERE id = ?
      `;

        const [rows] = await con.promise().query(userQuery, [userId]);

        // Check if user with the given ID exists
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send the user data as JSON response
        console.log(rows[0])
        res.json({
            name: rows[0].name,
            profileImage: rows[0].image,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;

