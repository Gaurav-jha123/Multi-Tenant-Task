const prisma = require("../config/prisma");

exports.createOrganization = async (name) => {
  if (!name) {
    throw new Error("Organization name is required");
  }

  return prisma.organization.create({
    data: { name },
  });
};
