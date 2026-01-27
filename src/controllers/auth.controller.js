const authService = require("../services/auth.service");
const jwt = require("jsonwebtoken");

exports.register = async (req , res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
};


exports.login = async (req, res) => {
  try {
    const identity = await authService.loginUser(req.body);

    const token = jwt.sign(
      {
        userId: identity.id,
        organizationId: identity.organizationId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};