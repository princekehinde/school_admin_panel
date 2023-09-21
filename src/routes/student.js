const express = require("express");
const studentValidator = require("../validation/studentValidation");
const StudentController = require("../controllers/studentController");
const Middleware = require("../middleware/auth-middleware");

const router = express.Router();

// Student Registration Endpoint
router.post(
  "/register",
  studentValidator.registerForm,
  StudentController.register
);

// Student Login Endpoint
router.post("/login", studentValidator.loginForm, StudentController.login);

// Mark Attendance (requires authentication)
router.post(
  "/markattendance",
  Middleware.isStudentAuthenticated,
  studentValidator.markAttendanceForm,
  StudentController.markAttendance
);

// Course Enrollment (requires authentication)
router.post(
  "/enroll-course",
  Middleware.isUserAuthenticated,
  studentValidator.enrollCourseForm,
  StudentController.enrollCourse
);

// Get Student Profile (requires authentication)
// router.get(
//   "/profile",
//   Middleware.isUserAuthenticated,
//   StudentController.getProfile
// );

// // Update Student Profile (requires authentication)
// router.put(
//   "/profile",
//   Middleware.isUserAuthenticated,
//   studentValidator.updateProfileForm,
//   StudentController.updateProfile
// );

// // Get Student Grades (requires authentication)
// router.get(
//   "/grades",
//   Middleware.isUserAuthenticated,
//   StudentController.getGrades
// );

// // Get Class Schedule (requires authentication)
// router.get(
//   "/class-schedule",
//   Middleware.isUserAuthenticated,
//   StudentController.getClassSchedule
// );

module.exports = router;
