//* Express
const express = require("express");
const router = express.Router();

//* Libraries
const bcrypt = require("bcrypt");

//* Models
const User = require("../models/user");

//* Login user
router.post("/login", async( req, res ) => {

    const user = await User.findOne({ email: req.body.email});

    if(!user) return res.status(400).send("Email or password not match");

    const hash = await bcrypt.compare( req.body.password, user.password);

    if(!hash) return res.status(400).send( "Email or password not match");

    const jwtToken = user.generateJWT();

    return res.status(200).send({ jwtToken });
});

module.exports = router;
