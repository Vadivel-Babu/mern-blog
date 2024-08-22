import express, { json } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import authRoute from "./routes/authRoutes.js";
import blogRoute from "./routes/blogRoutes.js";
const app = express();

const port = process.env.PORT || 5000;
connectDB();
app.use(express.static("./public"));
app.use(cors({ credentials: true }));
app.use(json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({ api: "working.." });
});
app.use("/api", authRoute);
app.use("/api/posts", blogRoute);

app.listen(port, () => {
  console.log(`listen in ${port}`);
});

//IBnfJmqJMSWrXxUq

//mongodb+srv://vadivelbabu31:<password>@blogcluster.lspi5.mongodb.net/
