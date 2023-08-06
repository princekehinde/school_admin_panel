const express = require('express');
const router = express.Router();

// Add your other route files here
router.use('/api/auth', require('./auth'));
// router.use('/api/students', require('./students'));
// router.use('/api/courses', require('./courses'));
// router.use('/api/staff', require('./staff'));
// router.use('/api/messages', require('./messages'));

module.exports = router;

