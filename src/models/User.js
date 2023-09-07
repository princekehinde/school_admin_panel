const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'student', 'parent'], required: true },
  email: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
