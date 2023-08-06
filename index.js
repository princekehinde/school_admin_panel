const express = require('express');
const server = require('./src/routes/index');
const db = require('./src/config/db');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB database
db()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(`Database connection failed ${err}`);
  });

// Routes setup
// app.use(server);

// Server listening on the specified port
app.listen(port, () => {
  console.log(`Web Service Running on: ${port}`);
});
