import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import authRoute from "./routes/authRoutes.js";
import blogRoute from "./routes/blogRoutes.js";
import userRoute from "./routes/userRoutes.js";
import notificationRoute from "./routes/notificationRoutes.js";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRECT_KEY,
});
const app = express();

const port = process.env.PORT || 5000;
connectDB();
app.use(cors({ origin: "*", credentials: true }));
app.use(json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({ api: "working.." });
});
app.use("/api/auth", authRoute);
app.use("/api/posts", blogRoute);
app.use("/api/user", userRoute);
app.use("/api/notification", notificationRoute);

app.listen(port, () => {
  console.log(`listen in ${port}`);
});

//IBnfJmqJMSWrXxUq

//mongodb+srv://vadivelbabu31:<password>@blogcluster.lspi5.mongodb.net/
