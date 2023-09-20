const studentService = require('../services/studentService');
const { successResponse, errorResponse } = require('../utils/response');

class StudentController {
  static async register(req, res) {
    try {
      const result = await studentService.register(req.body);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async login(req, res) {
    try {
      const result = await studentService.login(req.body);

      if (result.statusCode === 404 || result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async markAttendance(req, res) {
    try {
      const result = await studentService.markAttendance(req.body);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async enrollCourse(req, res) {
    try {
      const result = await studentService.enrollCourse(req.body);

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async getProfile(req, res) {
    try {
      const result = await studentService.getProfile(req.user.id); // Assuming you have a way to identify the student

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async updateProfile(req, res) {
    try {
      const result = await studentService.updateProfile({
        ...req.body,
        id: req.user.id, // Assuming you have a way to identify the student
      });

      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async getGrades(req, res) {
    try {
      const result = await studentService.getGrades(req.user.id); // Assuming you have a way to identify the student

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }

  static async getClassSchedule(req, res) {
    try {
      const result = await studentService.getClassSchedule(req.user.id); // Assuming you have a way to identify the student

      if (result.statusCode === 404)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message);
    }
  }
}

module.exports = StudentController;
