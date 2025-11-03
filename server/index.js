import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import ConnectDB from "./database/db.js";
import authRoute from "./routes/authRoute.js";
import './config/passport.js';
import searchRoute from "./routes/searchRoute.js";


dotenv.config();
ConnectDB();
const app = express();


app.use(express.json());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }
));

app.use("/auth", authRoute);
app.use("/api", searchRoute);

app.get('/',(req,res)=>{
    res.send("Backend Server is running..");
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
});

export default app;
