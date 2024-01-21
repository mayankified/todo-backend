import express, { Router } from "express";
import {
  getTask,
  createTask,
  editTask,
  deleteTask,
} from "../Controllers/task.js";
import { auth } from "../Middleware/Auth.js";

const taskrouter = express.Router();

taskrouter.post("/create", createTask);

taskrouter.post("/gettask", getTask);

taskrouter.post("/update", editTask);

taskrouter.post("/delete", deleteTask);

export default taskrouter;
