require("dotenv").config();
const express = require("express");
const authMiddleware = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());
console.log(require("./routes/auth.routes"));

app.use("/auth", require("./routes/auth.routes"));
app.use("/organizations", authMiddleware ,require("./routes/organization.routes"));
app.use("/tasks", authMiddleware, require("./routes/task.routes"));

module.exports = app;