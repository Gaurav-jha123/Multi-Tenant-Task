const taskRepository = require("../repositories/task.repository");

exports.createTask = async ({ title, description, user }) => {
  if (!title) {
    throw new Error("Task title is required");
  }

  return taskRepository.createTask({
    title,
    description,
    organizationId: user.organizationId,
    createdById: user.userId,
  });
};

exports.getTasks = async ({ user }) => {
  return taskRepository.getTasksByOrganization(user.organizationId);
};

exports.updateTask = async ({ taskId, title, description, user }) => {
  const task = await taskRepository.getTaskById(taskId);

  if (!task || task.organizationId !== user.organizationId) {
    throw new Error("Task not found");
  }

  return taskRepository.updateTask({
    id: taskId,
    data: {
      title,
      description,
    },
  });
};

exports.deleteTask = async ({ taskId, user }) => {
  const task = await taskRepository.getTaskById(taskId);

  if (!task || task.organizationId !== user.organizationId) {
    throw new Error("Task not found");
  }

  await taskRepository.deleteTask(taskId);
};


