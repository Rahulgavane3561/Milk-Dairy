require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51OavxzSDboyJWBIQfqPu4djpPzUkJuWDJzGjKFfAveU9MLHex5v6z8RSyNcTsafFvT1U60hh0fHtqfpWL1X2YSx000zy8D5V4a");

app.use(express.json());
app.use(cors());

// Function to generate random data for testing
const generateRandomData = () => {
    const randomProductName = `Dish ${Math.floor(Math.random() * 100)}`;
    const randomImage = "https://example.com/image.jpg"; // Replace with your image URL
    const randomPrice = Math.floor(Math.random() * 100) + 1; // Replace with your price logic
    const randomQuantity = Math.floor(Math.random() * 5) + 1;

    return {
        dish: randomProductName,
        imgdata: randomImage,
        price: randomPrice,
        qnty: randomQuantity,
    };
};

// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
    // Generate static random data for testing
    const products = Array.from({ length: 3 }, () => generateRandomData());

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.dish,
                images: [product.imgdata],
            },
            unit_amount: product.price * 100,
        },
        quantity: product.qnty,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/practice/success",
        cancel_url: "http://localhost:3000/practice/cancel",
    });

    res.json({ id: session.id });
});

app.listen(7000, () => {
    console.log("Server started on port 7000");
});
