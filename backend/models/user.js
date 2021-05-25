const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require ("moment");


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password: String,
    date:{ type: Date, default:Date.now}

});

userSchema.methods.generateJWT = () => {
    return jwt.sign({
        _id: this._id,
        name:this.name,
        iat:moment().unix(),
    }, "jassDevMySecret")
}

const User = mongoose.model( "user", userSchema);


module.exports = User;