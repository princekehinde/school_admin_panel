const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwtStrategy = require('./passport/jwtStrategy');

// MongoDB connection setup
mongoose.connect('mongodb://localhost/schooladmin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (error) => console.error('MongoDB connection error:', error));

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(jwtStrategy);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/messages', require('./routes/messages'));
// Add more routes for exam management and report generation here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

