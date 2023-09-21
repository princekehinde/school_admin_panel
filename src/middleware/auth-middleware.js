const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

// Middleware for user authentication
async function isUserAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return errorResponse(res, 401, 'Token required');
  }

  try {
    const decoded = jwt.verify(authorization, 'your-user-secret-key'); // Replace with your user secret key

    if (!decoded || !decoded.userId) {
      return errorResponse(res, 401, 'Invalid user token');
    }

    req.user = decoded;
    return next();
  } catch (error) {
    return errorResponse(res, 401, 'Invalid user token');
  }
}

// Middleware for admin authentication
async function isAdminAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return errorResponse(res, 401, 'Token required');
  }

  try {
    const decoded = jwt.verify(authorization, 'your-admin-secret-key'); // Replace with your admin secret key

    if (!decoded || !decoded.adminId) {
      return errorResponse(res, 401, 'Invalid admin token');
    }

    req.admin = decoded;
    return next();
  } catch (error) {
    return errorResponse(res, 401, 'Invalid admin token');
  }
}

// Middleware for student authentication
async function isStudentAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return errorResponse(res, 401, 'Token required');
  }

  try {
    const decoded = jwt.verify(authorization, 'your-student-secret-key'); // Replace with your student secret key

    if (!decoded || !decoded.studentId) {
      return errorResponse(res, 401, 'Invalid student token');
    }

    req.student = decoded;
    return next();
  } catch (error) {
    return errorResponse(res, 401, 'Invalid student token');
  }
}

module.exports = {
  isUserAuthenticated,
  isAdminAuthenticated,
  isStudentAuthenticated,
};
