import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
