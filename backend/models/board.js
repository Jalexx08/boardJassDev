//* Modules
const mongoose = require("mongoose");

//* Schema
const boardSchema = new mongoose.Schema({
    userId: String,
    name: String,
    description:String,
    status:String,
    imageUrl: String,
    date: { type: Date, default: Date.now}
});

//* Creating Collection board
const Board = mongoose.model("board", boardSchema);

module.exports = Board;