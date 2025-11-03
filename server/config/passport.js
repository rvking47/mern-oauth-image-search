import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from "dotenv";
import User from '../models/userModel.js';
dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            let user = await User.findOneAndUpdate({ providerId: profile.id, provider: "google" }, { isLoggedIn: true });

            if (!user) {
                user = await User.create({
                    provider: "google",
                    providerId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    isLoggedIn: true,
                    isVerifed: true
                })
            }

            return cb(null, user);
        }
        catch (err) {
            return cb(err, null);
        }
    }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOneAndUpdate({ providerId: profile.id, provider: "github" }, { isLoggedIn: true });

            if (!user) {
                user = await User.create({
                    provider: "github",
                    providerId: profile.id,
                    name: profile.displayName || profile.username,
                    email: profile.emails?.[0]?.value || "no-email@github.com",
                    avatar: profile.photos?.[0]?.value || `https://avatars.githubusercontent.com/u/${profile.id}?v=4`,
                    isLoggedIn: true,
                    isVerifed: true
                })
            }
            return done(null, user);
        }
        catch (err) {
            return done(err, null)
        }

    }
));


/*passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
},
    async (accessToken, refreshToken, profile, cb) => {
        try {
            let user = await User.findOneAndUpdate({ providerId: profile.id, provider: "facebook" }, { isLoggedIn: true });
            if (!user) {
                user = await User.create({
                    provider: "google",
                    providerId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    isLoggedIn: true,
                    isVerifed: true
                })
            }
            return cb(null, user);

        }
        catch (err) {
            return done(err, null)
        }
    }
));*/

