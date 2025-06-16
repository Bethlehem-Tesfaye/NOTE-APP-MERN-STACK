import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; //split based on space and take the 1 index
    if (!token) {
      return res.status(404).json({ success: false, message: "unautherized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "wrong token" });
    }

    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res.status(404).json({ success: false, message: "no user" });
    }

    const newUser = { name: user.name, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "please login" });
  }
};
export default middleware;
