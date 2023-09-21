const Joi = require("joi");
const { errorResponse } = require("../utils/response");

class StudentValidator {
  static async registerForm(req, res, next) {
    try {
      const registerFormSchema = Joi.object().keys({
        // Add validation rules for student registration here
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.date().iso().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required()
      });

      await registerFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async loginForm(req, res, next) {
    try {
      const loginFormSchema = Joi.object().keys({
        // Add validation rules for student login here
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });

      await loginFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async markAttendanceForm(req, res, next) {
    try {
      const markAttendanceFormSchema = Joi.object().keys({
        date: Joi.date().iso().required(), // Date of attendance (ISO format)
        status: Joi.string().valid('present', 'absent').required(), // Attendance status
        // Add any other fields that are required for marking attendance
      });

      await markAttendanceFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async enrollCourseForm(req, res, next) {
    try {
      const enrollCourseFormSchema = Joi.object().keys({
        courseName: Joi.string().required(), // Name of the course
        courseId: Joi.string().required(), // Course ID or some identifier
        // Add any other fields that are required for course enrollment
      });

      await enrollCourseFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}

module.exports = StudentValidator;
