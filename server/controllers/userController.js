import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const google = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.SECRET_KEY,
            { expiresIn: "7d" });
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    }
    catch (err) {
        res.status(500).json({ message: "google login error", err });
        res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
    }
}

const github = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.SECRET_KEY,
            { expiresIn: "7d" });
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    }
    catch (err) {
        console.error("google login error", err);
        res.redirect(`${process.env.CLIENT_URL}/login?error=github_failed`);
    }
}

const userLogout = async (req, res) => {
    try {
        const userId = req.userId;
        await User.findByIdAndUpdate(userId, { isLoggedIn: false });
        res.status(200).json({ message: "Logout SuccessFully!!" })
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { userLogout, google, github };