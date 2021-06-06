//* Modules
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//* Schema
const userSchema = new mongoose.Schema({
	role_id: { type: mongoose.Schema.ObjectId, ref: "role" },
	name: String,
	email: String,
	password: String,
	isActive: Boolean,
	date: { type: Date, default: Date.now },
});

//* Generating JWT by user
userSchema.methods.generateJWT = function () {
	return jwt.sign(
		{
			_id: this._id,
			role_id: this.role_id,
			name: this.name,
			email: this.email,
			iat: moment().unix(),
		},
		process.env.SECRET_kEY_JWT
	);
};
//* Creating Collection user
const User = mongoose.model("user", userSchema);

module.exports = User;
