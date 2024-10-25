const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3000;
const mongoose = require('mongoose');

require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

const api = process.env.API_URL; // Access the API_URL variable


const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    },
})
const Product = mongoose.model('Product', productSchema);


app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url',
        size: 'large',
        price: 400
    };
    res.send(product);
});

app.post(`${api}/products`, (req, res) => {
    const product  = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    }))
    .catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://lishamalik2001:Mld6jBzqzrYiAkbO@cluster0.almbk.mongodb.net/eshop_database?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,  // Corrected option name
        useUnifiedTopology: true
    }
)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Failed to connect to MongoDB", err); // Log the actual error
});

app.listen(port, () => {
    console.log(`API URL: ${api}`);
    console.log(`API is running at http://localhost:${port}`);
});
