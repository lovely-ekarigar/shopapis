const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routers/users'); // Import users router
require('dotenv').config();

const api = process.env.API_URL || '/api/v1'; // Ensure API_URL is set in .env

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Import Routers
const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products'); // Import products router

// Routers
app.use(`${api}/categories`, categoriesRouter); // Set up categories route
app.use(`${api}/products`, productsRouter);     // Set up products route
app.use(`${api}/users`, usersRouter);           // Set up users route

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API URL: ${api}`);
    console.log(`API is running at http://localhost:${port}`);
});