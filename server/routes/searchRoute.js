import express from "express";
import authMiddlware from "../middleware/isMiddleware.js";
import { imgSearch, histroy, topSearch, images } from "../controllers/searchController.js";

const searchRoute = express.Router();

searchRoute.get("/images", authMiddlware, images);
searchRoute.post("/search", authMiddlware, imgSearch);
searchRoute.get("/histroy",authMiddlware , histroy);
searchRoute.get("/top-histroy", authMiddlware, topSearch);

export default searchRoute;
