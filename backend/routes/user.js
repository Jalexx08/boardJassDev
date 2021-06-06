//*Express
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//* Libraries
const bcrypt = require("bcrypt");

//* Models
const User = require("../models/user");
const Role = require("../models/role");
const Admin = require("../middleware/admin");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");

//* Resgister user
router.post("/registerUser", async (req, res) => {
	if (!req.body.name || !req.body.email || !req.body.password)
		return res.status(400).send("Incomplete date");
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(200).send("Usuario ya existe");
	const hash = await bcrypt.hash(req.body.password, 10);
	const role = await Role.findOne({ name: "user" });

	if (!role) return res.status(401).send("No role assigned");

	user = new User({
		role_id: role._id,
		name: req.body.name,
		email: req.body.email,
		password: hash,
		isActive: true,
	});

	//* Saving in MongoDB

	try {
		const result = await user.save();
		if (!result) return res.status(401).send("Failed to register user");
		const jwtToken = user.generateJWT();
		res.status(200).send({ jwtToken });
	} catch (error) {
		return res.status(400), send("Failed to register user");
	}
});

//* Administrator

router.post("/registerAdmin", Auth, UserAuth, Admin, async (req, res) => {
	if (!req.body.name || !req.body.email || !req.body.password || !req.body.role_id)
		return res.status(401).send("Process failed: incomplete data");
	const validId = mongoose.Types.ObjectId.isValid(req.body.role_id);
	if (!validId) return res.status(401).send("id no valid");

	let user = await User.findOne({ email: req.body.email });
	if (user)
		return res
			.status(401)
			.send("Process failed: The user is alredy registered");

	const hash = await bcrypt.hash(req.body.password, 10);

	user = new User({
		role_id: req.body.role_id,
		name: req.body.name,
		email: req.body.email,
		password: hash,
		isActive: true,
	});

	//* Saving in MongoDB

	try {
		const result = await user.save();
		if (!result) return res.status(401).send("Failed to register user");
		const jwtToken = user.generateJWT();
		res.status(200).send({ jwtToken });
	} catch (error) {
		return res.status(400), send("Failed to register user");
	}
});

router.put("/updateUser", Auth, UserAuth, Admin, async (req, res) => {
	if (!req.body.name || !req.body.email || !req.body.password || !req.body.role_id)
		return res.status(401).send("Process failed: incomplete data");
	const hash = await bcrypt.hash(req.body.password, 10);

	const user = await User.findByIdAndUpdate(req.body._id, {
		role_id: req.body.role_id,
		name: req.body.name,
		email: req.body.email,
		password: hash,
		isActive: req.body.isActive,
	});

	if (!user) return res.status(401).send("Error editing user");
	return res.status(200).send({ user });
});

router.delete("/deleteUser/:id", Auth, UserAuth, Admin, async (req, res) => {
	const validId = mongoose.Types._ObjectId.isValid(req.params._id);
	if(!validId) return res.status(401).send("Invalid id");
	const user = await User.findByIdAndDelete(req.params._id);
	if(!user) return res.status(401).send("Failed delete");
	return res.status(200).send("User deleted")
});

router.put("/deleteUser", Auth, UserAuth, Admin, async (req, res) => {
	if (!req.body.name || !req.body.email || !req.body.password || !req.body.role_id)
		return res.status(401).send("Process failed: incomplete data");
	const hash = await bcrypt.hash(req.body.password, 10);

	const user = await User.findByIdAndUpdate(req.body._id, {
		role_id: req.body.role_id,
		name: req.body.name,
		email: req.body.email,
		password: hash,
		isActive: false,
	});

	if (!user) return res.status(401).send("Error editing user");
	return res.status(200).send({ user });
});

//* List user

router.get("/listUsers/:name?", Auth, UserAuth, Admin,  async (req, res) => {
	const users = await User.find({ name: new RegExp(req.params["name"], "i") })
		.populate("role_id")
		.exec();
	if (!users) return res.status(401).send("process failed: No users");
	return res.status(200).send({ users });
});

module.exports = router;
