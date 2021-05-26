const express = require("express");
const mongoose = require("mongoose");

const User = require("./routes/user");
const Auth = require("./routes/auth");

const app = express();

app.use(express.json());
app.use("/api/auth/", Auth);
app.use("/api/user/", User);

const port = process.env.PORT || 3002;

app.listen(port, () => console.log("Escuhando servidor en puerto: " + port));

mongoose
	.connect("mongodb://127.0.0.1:27017/bdjassdev", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("Conexion MongoDB activa"))
	.catch((err) => console.log("Error al conectar con MongoDB", err));
