import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    provider: {
        type: String
    },
    providerId: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    avatar: {
        type: String
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    },
    isVerifed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model("user", userShema);

export default User;