//* Express
const express = require("express");
const router = express.Router();

//* Models
const Board = require("../models/board");
const User = require("../models/user");

//* middlewares
const Auth = require("../middleware/auth");

//* Register tasks by user
router.post("/saveTask", Auth, async(req, res )=> {
    
    const user = await User.findById(req.user._id);
    
    if(!user) return res.status(401).send("Usuario no autenticado");

    const board = new Board({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do"
    });

    //* Saving in mongoDB
    const result = await board.save();
    return res.status(200).send( { result });

});

module.exports = router;