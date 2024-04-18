require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/Users");
const authRoutes = require("./routes/Auth");
const projectRoutes = require("./routes/Projects");
const profRoutes = require("./routes/Prof");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors())

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/prof", profRoutes);

const port = process.env.PORT || 5001;
app.listen(port, console.log(`Listening on port ${port}...`));
