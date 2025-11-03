import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddlware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
          return  res.status(401).json({ message: "Access token is missing or invalid" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
          return  res.status(401).json({ message: "Access Token has expired, use refreshtoken to generate again" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded)
        {
            return res.status(401).json({message:"Invalid token payload"})
        }

        const user = await User.findById(decoded.id);
        if (!user) {
          return  res.status(404).json({ message: "User not found" });
        }
        req.user = user
        req.userId = user._id
        next();
    }
    catch (err) {
        console.log("Authorization Error!!", err.message);
    }
}

export default authMiddlware;