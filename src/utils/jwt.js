
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const StudentModel = require("../models/student"); // Import the Student model

dotenv.config();

class JWT {
  /**
   * generate an access token for authorized user or student
   * @param {Object} data - The user or student object
   * @param {boolean} superAdmin - Flag indicating if the user is a super admin
   * @param {boolean} isStudent - Flag indicating if the object is a student
   * @returns {String} - The user or student token
   */
  static async generateToken(data, superAdmin = false, isStudent = false) {
    let payload;

    if (isStudent) {
      payload = {
        subject: data._id, // Use data._id for students
        isStudent: true, // Add a flag to indicate it's a student
      };
    } else if (!superAdmin) {
      payload = {
        subject: data.id, // Use data.id for users
      };
    } else {
      payload = {
        subject: data, // Use data for super admin
      };
    }

    const options = {
      expiresIn: "1d",
    };
    try {
      const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
      return token;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * Validate user or student token and see if they exist
   * @param {String} token - The JWT token
   * @returns {User|Student} - The user or student information or null
   */
  static async decodeToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.isStudent) {
        const student = await StudentModel.findById(decoded.subject);
        if (!student) {
          return {
            statusCode: 401,
            message: "Invalid student token",
          };
        }
        return student;
      } else {
        const user = await UserModel.findById(decoded.subject);
        if (!user) {
          return {
            statusCode: 401,
            message: "Invalid user token",
          };
        }
        return user;
      }
    } catch (error) {
      return null;
    }
  }
}

module.exports = JWT;