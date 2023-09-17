const Joi = require("joi");
const { successResponse, errorResponse } = require("../utils/response");

class userValidator {
  static async registerAndLoginForm(req, res, next) {
    try {
      const registerAndLoginFormSchema = Joi.object().keys({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().min(8).required(),
        role: Joi.string().valid('teacher', 'student', 'parent').default('student').required()
      });

      await registerAndLoginFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async changePasswordForm(req, res, next) {
    try {
      const changePasswordFormSchema = Joi.object().keys({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().min(8).required(),
      });

      await changePasswordFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async forgetPasswordForm(req, res, next) {
    try {
      const forgetPasswordFormSchema = Joi.object().keys({
        email: Joi.string().email().required(),
      });

      await forgetPasswordFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }

  static async resetPasswordForm(req, res, next) {
    try {
      const resetPasswordFormSchema = Joi.object().keys({
        email: Joi.string().email().required(), // Email is required
        token: Joi.string().required(), // Token is required
        password: Joi.string().min(8).required(), // Password is required
      });
  
      await resetPasswordFormSchema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      return errorResponse(res, 400, error.message);
    }
  }
}
  
module.exports = userValidator;