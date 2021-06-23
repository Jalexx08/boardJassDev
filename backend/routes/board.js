//* Express
const express = require("express");
const router = express.Router();

//* Modules
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const moment = require("moment");
const multiparty = require("connect-multiparty");
const mult = multiparty();

//* Models
const Board = require("../models/board");
const User = require("../models/user");

//* Middlewares
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Upload = require("../middleware/file");

//* Register tasks with img by user
router.post("/saveTaskImg", mult, Upload, Auth, UserAuth, async (req, res) => {
	if (!req.body.name || !req.body.description)
		return res.status(400).send(" Incomplete data post");
	let imageUrl = "";
	let imgReq = req.files.image;
	if (req.files !== undefined && imgReq.type) {
		const url = req.protocol + "://" + req.get("host") + "/";
		let serverImg = "./uploads/" + moment().unix() + path.extname(imgReq.path);
		fs.createReadStream(imgReq.path).pipe(fs.createWriteStream(serverImg));

		imageUrl = url + "uploads/" + moment().unix() + path.extname(imgReq.path);
	}
	const user = await User.findById(req.user._id);

	if (!user) return res.status(401).send("User is not authorized");

	const board = new Board({
		userId: user._id,
		name: req.body.name,
		description: req.body.description,
		status: "to-do",
		imageUrl,
	});

	//* Saving in mongoDB
	const result = await board.save();
	return res.status(200).send({ result });
});

//* Register tasks by user
router.post("/saveTask", Auth, UserAuth, async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) return res.status(401).send("User is not authenticated");

	const board = new Board({
		userId: user._id,
		name: req.body.name,
		description: req.body.description,
		status: "to-do",
	});

	//* Saving in mongoDB
	const result = await board.save();
	return res.status(200).send({ result });
});

//* Get all of the user's activities
router.get("/listTask", Auth, UserAuth, async (req, res) => {
	const validId = mongoose.Types.ObjectId.isValid(req.user._id);

	if (!validId) return res.status(400).send("This Id is not valid");
	const board = await Board.find({ userId: req.user._id });
	return res.status(200).send({ board });
});

module.exports = router;

//* Update  user's activities
router.put("/updateTask", Auth, UserAuth, async (req, res) => {
	if (
		!req.body._id ||
		!req.body.name ||
		!req.body.status ||
		!req.body.description
	)
		return res.status(400).send("Incomplete data");

	const validId = mongoose.Types.ObjectId.isValid(req.body._id);
	if (!validId) return res.status(400).send("This Id is not valid");

	const user = await User.findById(req.user._id);
	if (!user) return res.status(401).send("User not exist");

	const board = await Board.findByIdAndUpdate(req.body._id, {
		userId: user._id,
		name: req.body.name,
		description: req.body.description,
		status: req.body.status,
	});
	if (!board)
		return res.status(401).send("It's not possible edit");

	return res.status(200).send({ board });
});

//*  Delete  user's activities
router.delete("/deleteTask/:_id", Auth, UserAuth, async (req, res) => {
	const validId = mongoose.Types.ObjectId.isValid(req.params._id);
	if (!validId) return res.status(400).send("This Id is not valid");

	const board = await Board.findByIdAndDelete(req.params._id);
	if (!board)
		return res.status(401).send("No task to delete");

	return res.status(200).send({ msg: "Deleted task"});
});
