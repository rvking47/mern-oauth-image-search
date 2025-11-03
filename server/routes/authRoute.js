import express, { json } from "express";
import passport from "passport";
import authMiddlware from "../middleware/isMiddleware.js";
import { userLogout,  google, github } from "../controllers/userController.js";

const authRoute = express.Router();

//google login

authRoute.get("/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: "consent" }));
authRoute.get("/google/callback", passport.authenticate("google", { session: false }), google);



//github login
authRoute.get("/github", passport.authenticate("github", { scope: ['user:email'], prompt: "consent" }));
authRoute.get("/github/callback", passport.authenticate("github", { session: false }), github);

//facebook login




authRoute.get("/me", authMiddlware, (req, res) => {
    res.json({ success: true, user: req.user });
});

authRoute.get("/logout", authMiddlware, userLogout);




export default authRoute;