import mongoose from "mongoose";

const searchShema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    term: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Search = mongoose.model("search", searchShema);

export default Search;