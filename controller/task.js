const Task = require('../models/task');

//Create Task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json({
      message: 'Task created',
      data: task,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//  Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');

    return res.status(200).json({
      data: tasks,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//  Get task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedTo');

        if (!task) {
            return res.status(404).json({
                message: 'Task not found',
            });
        }
        return res.status(200).json({
            data: task,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

// Update task by ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: 'Task updated',
      data: task,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Delete task by ID
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: 'Task deleted',
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};