require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/Users");
const authRoutes = require("./routes/Auth");
const projectRoutes = require("./routes/Projects");
const profRoutes = require("./routes/Prof");
const bodyParser = require('body-parser');
const config = require("./config_backend.js");

const host = config.server.host;
const port = config.server.port;

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use("/files", express.static("files"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/prof", profRoutes);

// const port = process.env.PORT || 5001;
app.listen(port, console.log(`Listening on host ${host}... and port ${port}...`));
