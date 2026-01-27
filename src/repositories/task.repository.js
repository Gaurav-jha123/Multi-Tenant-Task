const prisma = require("../config/prisma");

exports.createTask = async ({ title, description, organizationId, createdById }) => {
  return prisma.task.create({
    data: {
      title,
      description,
      organizationId,
      createdById,
    },
  });
};

exports.getTasksByOrganization = async (organizationId) => {
  return prisma.task.findMany({
    where: {
      organizationId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


exports.getTaskById = async (id) => {
  return prisma.task.findUnique({
    where: { id },
  });
};

exports.updateTask = async ({ id, data }) => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

exports.deleteTask = async (id) => {
  return prisma.task.delete({
    where: { id },
  });
};
