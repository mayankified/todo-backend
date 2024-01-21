import { Task } from "../Model/task.js";
import { handleError } from "../Middleware/error.js";


export const createTask = async (req, res) => {
  try {
    const { title } = req.body[0];
    const newTask = await Task.create({
      title,
      user: req.body[1],
    });

    res.status(201).json({
      success: true,
      message: "Task created",
      data: newTask,
    });
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
};

export const editTask = async (req, res) => {
  try {
    const task = await Task.findById(req.body._id);

    if (!task) {
      return handleError(res, 404, "Task not found");
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated",
      data: task,
    });
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.body._id);

    if (!task) {
      return handleError(res, 404, "Task not found");
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
};

export const getTask = async (req, res) => {
  try {
    const userid = req.body._id;
    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      message: "Tasks retrieved",
      data: tasks,
    });
  } catch (error) {
    handleError(res, 500, "Internal Server Error");
  }
};
