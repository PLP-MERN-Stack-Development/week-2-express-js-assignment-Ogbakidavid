// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const productsRoute = require('./routes/products');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandling');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(logger);

app.use('/api/products', productsRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(errorHandler)


// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;