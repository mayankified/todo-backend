import express, { json } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { Mongod } from "./database/Mongo.js";
import userrouter from "./Routes/user.js";
import { Task } from "./Model/task.js";
import { User } from "./Model/users.js";
import taskrouter from "./Routes/task.js";
import cors from "cors";




const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: [process.env.LINK, 'https://tinudo.vercel.app'],// Replace with your frontend domain
  credentials: true,
}));

config({
  path: "./Config/config.env",
});

Mongod();

app.use("/api/v1/user", userrouter);
app.use("/api/v1/task", taskrouter);


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log(`Server is running at Port:${process.env.PORT}`);
});
