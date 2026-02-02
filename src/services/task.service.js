const taskRepository = require("../repositories/task.repository");

exports.createTask = async ({ title, description, user }) => {
  return taskRepository.createTask({
    title,
    description,
    organizationId: user.organizationId,
    createdById: user.userId,
  });
};

exports.getTasks = async (user) => {
  return taskRepository.listTasksByOrg(user.organizationId);
};

exports.getTaskById = async (taskId, user) => {
  const task = await taskRepository.getTaskByIdAndOrg(
    taskId,
    user.organizationId
  );

  if (!task) throw new Error("Task not found");
  return task;
};

exports.updateTask = async (taskId, data, user) => {
  const result = await taskRepository.updateTaskByIdAndOrg(
    taskId,
    user.organizationId,
    data
  );

  //if (result.count === 0) throw new Error("Task not found");
  return { success: true };
};

exports.updateTaskStatus = async ({ taskId, newStatus, user }) => {
  const task = await taskRepository.getTaskByIdAndOrg(
    taskId,
    user.organizationId
  );

  if (!task) throw new Error("Task not found");
  if (task.status === "COMPLETED")
    throw new Error("Completed tasks cannot be updated");
  if (newStatus !== "COMPLETED")
    throw new Error("Invalid status transition");

  await taskRepository.updateTaskByIdAndOrg(
    taskId,
    user.organizationId,
    { status: newStatus }
  );

  return { success: true };
};

exports.deleteTask = async (taskId, user) => {
  const result = await taskRepository.deleteTaskByIdAndOrg(
    taskId,
    user.organizationId
  );

  if (result.count === 0) throw new Error("Task not found");
  return { success: true };
};

exports.getTasksPaginated = async ({ user, page, limit }) => {
  const safeLimit = Math.min(limit || 20, 100);
  const safePage = page && page > 0 ? page : 1;
  const offset = (safePage - 1) * safeLimit;

  const [tasks, total] = await Promise.all([
    taskRepository.listTasksByOrgPaginated(
      user.organizationId,
      { offset, limit: safeLimit }
    ),
    taskRepository.countTasksByOrg(user.organizationId),
  ]);

  return {
    data: tasks,
    meta: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
    },
  };
};
