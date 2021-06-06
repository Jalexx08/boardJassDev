const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log("Connection MongoDB successful!");
	} catch (error) {
		console.log("It doesn't possible to connect with MongoDB", error);
		throw new Error("It doesn't possible to connect with MongoDB ");
	}
};

module.exports = { dbConnection };