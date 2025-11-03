import axios from "axios";
import Search from "../models/searchModel.js";


const images = async (req, res) => {
    try {
        const { term="all" } = req.query;
        const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query: term,
                client_id: process.env.UNSPLASH_ACCESS_KEY,
                per_page: 30,
            }
        });
        res.status(200).json({
            results: response.data.results,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const imgSearch = async (req, res) => {
    try {
        const { term } = req.body;
        const userId = req.user?._id;

        await Search.create({ userId, term });

        const response = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query: term,
                client_id: process.env.UNSPLASH_ACCESS_KEY,
                per_page: 30,
            },
        });
        res.status(200).json({
            message: `You searched for "${term}"`,
            results: response.data.results,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const histroy = async (req, res) => {
    try {
        const userId = req.user?._id;
        const histroy = await Search.find({ userId }).sort({ timestamp: -1 });
        res.status(200).json(histroy);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const topSearch = async (req, res) => {
    try {
        const top = await Search.aggregate([{ $group: { _id: "$term", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
        ]);
        res.status(200).json(top);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { imgSearch, histroy, topSearch, images };
