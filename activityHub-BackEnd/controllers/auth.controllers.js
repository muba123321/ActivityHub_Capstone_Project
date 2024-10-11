import { admin } from "../config/firebaseAdmin.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
// import bcryptjs from "bcryptjs";

export const signUp = async (req, res, next) => {
  const {
    name,
    email,
    // password,
    uid,
  } = req.body;
  const existingUser = await User.findOne({ uid });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  //   const hashedPassword = await bcryptjs.hash(password, 10);
  const user = new User({
    name,
    email,
    // password: hashedPassword,
    uid,
  });
  try {
    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization?.split(" ")[1];
    if (!idToken) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: No token provided" });
    }
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    const { uid } = decodedIdToken;
    let validUser = await User.findOne({
      uid,
    });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    res.cookie("access_token", idToken, {
      httpOnly: true,
      // secure: true,
      // sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: validUser,
    });
  } catch (err) {
    next(err);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (err) {
    next(err);
  }
};
