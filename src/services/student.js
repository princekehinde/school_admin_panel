const Student = require('./../models/student'); // Import the Student model
const Grade = require('./../models/Grade'); // Assuming you have a Grade model
const Schedule = require('./../models/Schedule'); // Assuming you have a Schedule model
const bcrypt = require("bcryptjs");
const jwt = require("./../utils/jwt");
const { successResponse, errorResponse } = require('./../utils/response');

class StudentService {
  constructor() {}

  /**
   * @description Registers a new student.
   * @param {object} data - Student registration data containing firstName, lastName, email, and phone.
   * @returns {object} - A response object with status code, message, and data.
   */
  static async register(data) {
    try {
      const { firstName, lastName, email, phone, password } = data;
      const student = await Student.findOne({ email: email });

      if (student)
        return {
          statusCode: 400,
          message: 'Student with this email already exists',
        };

      const createStudent = await Student.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password
      });

      return {
        statusCode: 200,
        message: 'Student registered successfully',
        data: createStudent,
      };
    } catch (error) { 
      throw new Error(error);
    }
  }
/**
 * @description Registers a new student.
 * @param {object} data - Student registration data containing firstName, lastName, email, and phone.
 * @returns {object} - A response object with status code, message, and data.
 */
static async register(data) {
  try {
    const { firstName, lastName, email, phone, password } = data;
    const student = await Student.findOne({ email: email });

    if (student)
      return {
        statusCode: 400,
        message: 'Student with this email already exists',
      };

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const createStudent = await Student.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: hashedPassword, // Save the hashed password
    });

    return {
      statusCode: 200,
      message: 'Student registered successfully',
      data: createStudent,
    };
  } catch (error) {
    throw new Error(error);
  }
}

   /**
   * @description Logs in a student.
   * @param {object} data - Student login data containing email.
   * @returns {object} - A response object with status code, message, and data (token).
   */
   static async login(data) {
    try {
      const { email } = data;

      // Attempt to find a student with the provided email
      const student = await Student.findOne({ email: email });

      if (!student) {
        console.log('Student not found in the database.');
        // If student is not found, return a 404 response
        return {
          statusCode: 404,
          message: 'Student not found',
        };
      }

      // Generate a token for the authenticated student (you can use JWT or any other method)
      const token = await jwt.generateToken(student);

      // Return a 200 response with the token
      return {
        statusCode: 200,
        message: 'Login successful',
        data: {
          token,
        },
      };
    } catch (error) {
      console.error('Error in login:', error);

      // If any error occurs, return a 500 response with the error message
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  }
  

  /**
   * @description Marks attendance for a student.
   * @param {object} data - Data containing the date, status, and token.
   * @returns {object} - A response object with status code and message.
   */
  static async markAttendance(data) {
    try {
      const { date, status, token } = data;

      // Verify the token to ensure it's valid and get the student's information
      const studentData = jwt.verifyToken(token);

      if (!studentData) {
        return {
          statusCode: 401,
          message: 'Unauthorized. Token is invalid or expired.',
        };
      }

      const student = await Student.findById(studentData.studentId);

      if (!student)
        return {
          statusCode: 404,
          message: 'Student not found',
        };

      student.attendance.push({ date, status });
      await student.save();

      return {
        statusCode: 200,
        message: 'Attendance marked successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description Enrolls a student in a course.
   * @param {object} data - Data containing the course name, course ID, and token.
   * @returns {object} - A response object with status code and message.
   */
  static async enrollCourse(data) {
    try {
      const { courseName, courseId, token } = data;

      // Verify the token to ensure it's valid and get the student's information
      const studentData = jwt.verifyToken(token);

      if (!studentData) {
        return {
          statusCode: 401,
          message: 'Unauthorized. Token is invalid or expired.',
        };
      }

      const student = await Student.findById(studentData.studentId);

      if (!student)
        return {
          statusCode: 404,
          message: 'Student not found',
        };

      student.enrolledCourses.push({ courseName, courseId });
      await student.save();

      return {
        statusCode: 200,
        message: 'Enrolled in the course successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}


module.exports = StudentService;
