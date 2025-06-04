import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/surveyRoutes.js";
import connectDB from "./config/mongodb.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
// app.use(cors());
app.use(cors({ 
  origin: [
  "http://localhost:5173"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/survey", router);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
});