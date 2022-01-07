const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51I2EMNJ5mNSiwXzgTkdIA2EnPvu93dlrNRzYM7UPC5K4EKyjFqkLhZLBol9N0GIqyxLcd8MjnwZCOPAo4Xchay4a000StVVlUY')

//API

// - App Config
const app = express();

// - Middleware
app.use(cors({origin: true}))
app.use(express.json())

// - API routes

app.get('/', (req, res) => res.status(200).send('Movie Server Started...'))
app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    console.log("Payment Request Received BOOM!!  >>>>", total );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    });


    //OK Created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// - Listen command
// exports.api = functions.https.onRequest(app)