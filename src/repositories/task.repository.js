const prisma = require("../config/prisma");

exports.createTask = (data) => {
  return prisma.task.create({ data });
};

exports.getTaskByIdAndOrg = (taskId, organizationId) => {
  return prisma.task.findFirst({
    where: { id: taskId, organizationId },
  });
};

exports.listTasksByOrg = (organizationId) => {
  return prisma.task.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  });
};

exports.updateTaskByIdAndOrg = (taskId, organizationId, data) => {
  return prisma.task.updateMany({
    where: { id: taskId, organizationId },
    data,
  });
};

exports.deleteTaskByIdAndOrg = (taskId, organizationId) => {
  return prisma.task.deleteMany({
    where: { id: taskId, organizationId },
  });
};


exports.listTasksByOrgPaginated = (
  organizationId,
  { offset, limit }
) => {
  return prisma.task.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });
};

exports.countTasksByOrg = (organizationId) => {
  return prisma.task.count({
    where: { organizationId },
  });
};