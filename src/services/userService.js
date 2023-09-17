const bcrypt = require("bcryptjs");
const jwt = require("./../utils/jwt");
const User = require("./../models/User");
const EmailService = require("../utils/node-mail");

class UserService {
  constructor() {}

  static userResponse(data) {
    return {
      email: data.email,
      username: data.username,
      id: data.id,
      role: data.role, // Add the 'role' field to the response
    };
  }

  /**
   * @param {string} username the username of the user
   * @param {string} email the email of the user
   * @param {string} password the password of the user
   * @param {string} role the role of the user
   */

  static async register(data) {
    try {
      const { email, username, password, role } = data;
      const user = await User.findOne({
        $or: [
          { email: email },
          { username: username },
        ],
      });

      if (user)
        return {
          statusCode: 400,
          message: "User with this email or username already exists",
        };

      const hashPassword = await bcrypt.hash(password, 10); // Use bcrypt.hash, not bcrypt.hashSync

      const createUser = await User.create({
        email: email,
        username: username,
        password: hashPassword,
        role: role // Assuming 'role' is passed correctly in the 'data' object
      });

      return {
        statusCode: 200,
        message: "User created successfully",
        data: await UserService.userResponse(createUser),
      };
    } catch (error) {
      throw new Error(error);
    }
  }
/**
 * @description - This method handles user login by verifying the provided email and password.
 * @param {object} data - The user login data containing email and password.
 * @returns {object} - A response object with status code, message, and data (token and user information).
 */
static async login(data) {
  try {
    const { email, password } = data;

    // console.log("Attempting to find user with email:", email);

    // Attempt to find a user with the provided email
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("User not found in the database.");
      // If user is not found, return a 404 response
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    // Compare the provided password with the user's hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password.");
      // If password is invalid, return a 401 response
      return {
        statusCode: 401,
        message: "Invalid password",
      };
    }

    // Generate a token for the authenticated user
    const token = await jwt.generateToken(user);

    // Return a 200 response with the token and user data
    return {
      statusCode: 200,
      message: "Login successful",
      data: {
        token,
        user: await UserService.userResponse(user),
      },
    };
  } catch (error) {
    console.error("Error in login:", error);

    // If any error occurs, return a 500 response with the error message
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
}



  /**
   * @description - This method is used to change the password of a user
   * @param {object} data - The data of the user
   * @returns {object} - The response of the user
   */
  static async changePassword(data) {
    const { oldPassword, newPassword } = data;
    const user = await User.findById(data.id);

    // update password if old password is valid
    const isPasswordValid = await bcrypt.compareSync(
      oldPassword,
      user.password
    );
    if (!isPasswordValid)
      return {
        statusCode: 401,
        message: "Invalid password",
      };

    const hashPassword = await bcrypt.hashSync(newPassword, 10);
    await User.findByIdAndUpdate(data.id, { password: hashPassword });

    return {
      statusCode: 200,
      message: "Password changed successfully",
    };
  }

  /**
   * @description - This method is used to send mail for forget password
   * @param {object} data - The data of the user
   * @returns {object} - The response of the user
   */
  static async forgetPassword(data) {
    console.log(data, "data");
    const { email } = data;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return {
        statusCode: 404,
        message: "User not found",
      };

    const token = await jwt.generateToken(user);
    const url = `http://localhost:3000/reset-password/${token}`;
    const message = `<p>Click <a href="${url}">here</a> to reset your password</p>`;
    const mailSent = await EmailService.sendMail(
      email,
      "Reset Password",
      message
    );

    if (!mailSent)
      // update reset password token with default number
      await User.findOneAndUpdate(
        { email },
        { $set: { resetPasswordToken: "1234" } }
      );

    return {
      statusCode: 200,
      message: "Email sent successfully",
    };
  }

/**
 * @description - This method is used to reset the password of a user
 * @param {object} data - The data of the user
 * @returns {object} - The response of the user
 */
static async resetPassword(data) {
  const { email, password, token } = data;
  const user = await User.findOne({ email });
  
  if (!user) {
    return {
      statusCode: 404,
      message: "User not found",
    };
  }
  
  const hashPassword = await bcrypt.hashSync(password, 10);
  await User.findOneAndUpdate(
    { resetPasswordToken: token },
    {
      $set: {
        password: hashPassword,
        resetPasswordToken: "",
        no_of_tries: 0,
      },
    }
  );

  return {
    statusCode: 200,
    message: "Password changed successfully",
  };
}
}

module.exports = UserService;
