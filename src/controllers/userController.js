const userService = require("../services/userService");
const {
  successResponse,
  errorResponse,
  loginSuccessResponse,
  paginationSuccessResponse,
} = require("../utils/response");

class UserController {
  static async register(req, res) {
    try {
      const result = await userService.register(req.body);

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
      const result = await userService.login(req.body);

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

  static async changePassword(req, res) {
    try {
      const result = await userService.changePassword({
        ...req.body,
        id: req.user.id,
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

  static async forgetPassword(req, res) {
    try {
      const result = await userService.forgetPassword(req.body);
      if (result.statusCode === 400)
        return errorResponse(res, result.statusCode, result.message);

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return errorResponse(res, 500, error.message)
    }
  }

  static async resetPassword(req, res) {
    try {
      const result = await userService.resetPassword(req.body);
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
}
module.exports = UserController;


