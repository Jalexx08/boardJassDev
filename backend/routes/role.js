//* Express
const express = require("express");
const router = express.Router();

const Admin = require("../middleware/admin");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

const Role = require("../models/role");

router.post("/registerRole", Auth, UserAuth, Admin, async (req, res) => {
	if (!req.body.name || !req.body.description)
		return res.status(401).send("Data incomplete");

	const isRole = await Role.findOne({ name: req.body.name });

	if (isRole) return res.status(401).send("There is already a role");

	const role = new Role({
		name: req.body.name,
		description: req.body.description,
		isActive: true,
	});

	const result = await role.save();
	if (!result) return res.status(401).send("failed to register role");
	return res.status(200).send({ result });
});

router.get("/listRole", Auth, UserAuth, Admin, async (req, res) => {
	const roles = await Role.find();
	if (!roles) return res.status(401).send("Ther are no roles");
	return res.status(200).send({ roles });
});

module.exports = router;
