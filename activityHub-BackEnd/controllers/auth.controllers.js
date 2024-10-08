import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    res.status(400).json(err.message);
  }
};
