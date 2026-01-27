const taskService = require("../services/task.service");

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask({
      title: req.body.title,
      description: req.body.description,
      user: req.user,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks({
      user: req.user,
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask({
      taskId: req.params.id,
      title: req.body.title,
      description: req.body.description,
      user: req.user,
    });

    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask({
      taskId: req.params.id,
      user: req.user,
    });

    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

