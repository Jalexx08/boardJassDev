//* Libraries
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require ("moment");

//* Schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password: String,
    date:{ type: Date, default:Date.now}

});

//* Generating JWT by user
userSchema.methods.generateJWT = function() {
    return jwt.sign({
        _id: this._id,
        name:this.name,
        iat:moment().unix(),
    }, "jassDevMySecret")
}
//* Creating Collection user
const User = mongoose.model( "user", userSchema);

module.exports = User;