const taskService = require("../services/task.service");

exports.createTask = async (req, res) => {
  const task = await taskService.createTask({
    title: req.body.title,
    description: req.body.description,
    user: req.user,
  });
  res.status(201).json(task);
};

// exports.getTasks = async (req, res) => {
//   const tasks = await taskService.getTasks(req.user);
//   res.json(tasks);
// };

exports.getTaskById = async (req, res) => {
  const task = await taskService.getTaskById(req.params.id, req.user);
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const result = await taskService.updateTask(
    req.params.id,
    req.body,
    req.user
  );
  res.json(result);
};

exports.updateTaskStatus = async (req, res) => {
  const result = await taskService.updateTaskStatus({
    taskId: req.params.id,
    newStatus: req.body.status,
    user: req.user,
  });
  res.json(result);
};

exports.deleteTask = async (req, res) => {
  const result = await taskService.deleteTask(req.params.id, req.user);
  res.json(result);
};

exports.getTasks = async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  const result = await taskService.getTasksPaginated({
    user: req.user,
    page,
    limit,
  });

  res.json(result);
};
