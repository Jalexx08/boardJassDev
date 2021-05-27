//* Express
const express = require("express");
const router = express.Router();

//* Models
const Board = require("../models/board");
const User = require("../models/user");

//* Middlewares
const Auth = require("../middleware/auth");

//* Register tasks by user
router.post("/saveTask", Auth, async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) return res.status(401).send("Usuario no autenticado");

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

router.get("/listTask", Auth, async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) return res.status(401).send("El usuario no existe");

	const board = await Board.find({ userId: req.user._id });
	return res.status(200).send({ board });
});

module.exports = router;

//* Update  user's activities

router.put("/updateTask", Auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) return res.status(401).send("Usuario no existe");

	const board = await Board.findByIdAndUpdate(req.body._id, {
        userId: user._id,
        name: req.body.name,
        description:req.body.description,
        status:req.body.status,
    });
	if (!board)
		return res.status(401).send("No es posible editar la información");

	return res.status(200).send({ board });
});

//*  Delete  user's activities

router.delete("/:_id", Auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) return res.status(401).send("Usuario no existe");

	const board = await Board.findByIdAndDelete(req.params._id);
	if (!board) return res.status(401).send(" No se encontró ninguna tarea para eliminar");

	return res.status(200).send("Se ha eliminado la actividad");
});
