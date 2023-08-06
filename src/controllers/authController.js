const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    await authService.registerUser(username, password, role);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await authService.loginUser(username, password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
