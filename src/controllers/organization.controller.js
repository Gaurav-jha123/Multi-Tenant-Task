const service = require("../services/organization.service");

exports.createOrganization = async (req, res) => {
  try {
    const org = await service.createOrganization(req.body.name);
    res.status(201).json(org);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
