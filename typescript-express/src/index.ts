import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router/index.ts";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());

app.listen(8000, () =>
  console.log("Server is Running on Port http://localhost:8000/")
);

const MONGO_URL =
  "mongodb+srv://typescript:<password>@cluster0.afv85q1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

try {
  mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDb Connected Successfully");
  });
} catch (error) {
  console.log(error.message);
}

app.use("/", router());
