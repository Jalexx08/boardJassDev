//* Express
const express = require("express");
const app = express();
const cors = require("cors");
require ("dotenv").config();
const { dbConnection } = require('./db/db');


//* Routes
const Auth = require("./routes/auth");
const Board = require("./routes/board");
const User = require("./routes/user");
const Role = require('./routes/role');

//* Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);
app.use("/api/role/", Role);
app.use("/api/user/", User);

//* Ports;
app.listen(process.env.PORT, () => console.log("Server listening at port: " + process.env.PORT));

//* Connecting to MongoDB
dbConnection();
