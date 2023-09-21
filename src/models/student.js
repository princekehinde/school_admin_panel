const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: false, format: 'isoDate' }, // Use ISO date format
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  // Add fields for marking attendance and enrolling in courses
  attendance: [
    {
      date: { type: Date, required: true }, // Date of attendance
      status: { type: String, enum: ['present', 'absent'], required: true }, // Attendance status
    }
  ],
  enrolledCourses: [
    {
      courseName: { type: String, required: true },
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Assuming you have a Course model
    }
  ],
});

// Create a Student model using the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

