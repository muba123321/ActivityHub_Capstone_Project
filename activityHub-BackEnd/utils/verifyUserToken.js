import { admin } from "../config/firebaseAdmin.js";

export const verifyUserToken = async (req, res, next) => {
  try {
    const idToken = req.header.authorization?.split(" ")[1];
    if (!idToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("Error verifying Firebase ID token:", err);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
