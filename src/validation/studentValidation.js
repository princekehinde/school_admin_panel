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
        // Add any other fields relevant to student registration
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

  // Add additional validation methods for student-related actions as needed

  // Example:
  static async updateProfileForm(req, res, next) {
    try {
      const updateProfileFormSchema = Joi.object().keys({
        // Add validation rules for updating student profile here
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.date().iso().required(),
        // Add any other fields that can be updated in the student profile
      });

      await updateProfileFormSchema.validateAsync(req.body, {
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
        courseId: Joi.string().required(), // Assuming courseId is required
        date: Joi.date().iso().required(), // Assuming date is required
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
        courseId: Joi.string().required(), // Assuming courseId is required
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
