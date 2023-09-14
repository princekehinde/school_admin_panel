/* eslint-disable no-underscore-dangle */
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
// const AdminManager = require("../modules/admin-manager");

dotenv.config();

class JWT {
  /**
   * generate an access token for authorized user
   * @param {Object} data - The user object
   * @param {boolean} superAdmin - Flag indicating if the user is a super admin
   * @returns {String} - The user token
   */
  static async generateToken(data, superAdmin = false) {
    let payload;

    if (!superAdmin) {
      payload = {
        subject: data.id, // Use data.id instead of user.id
      };
    } else {
      payload = {
        subject: data, // Use data instead of user
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
   * Validate userToken and see if they exist
   * @param {String} token - The JWT token
   * @returns {User} - The userInformation token or null
   */
  static async decodeToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findById(decoded.subject);
      if (!user) {
        return {
          statusCode: 401,
          message: "Invalid token",
        };
      }
      return user;
    } catch (error) {
      return null;
    }
  }
}

module.exports = JWT;
