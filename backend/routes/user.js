//*Express
const express = require("express");
const router = express.Router();

//* Libraries
const bcrypt = require("bcrypt");

//* Models
const User = require("../models/user");


//* Resgister user
router.post("/registerUser", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });

	if (user) return res.status(200).send("Usuario ya existe");

	const hash = await bcrypt.hash(req.body.password, 10);

	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hash,
	});

	//* Saving in MongoDB
	const result = await user.save();

	if (result) {
		const jwtToken = user.generateJWT();
		res.status(200).send({ jwtToken });
	} else {
		return res.status(400).send("No se pudo registrar el usuario");
	}
});

module.exports = router;
