const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
// const logger = require("./utils/logger");
const sequelize = require("./utils/database");
const User = require("./models/user");
const Link = require("./models/link");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes /loginRouter");

//  DB Connection
User.hasMany(Link, { foreignKey: "userId", as: "links" }); // Associations

sequelize
  .sync({ force: true })
  .then((res) => {
    console.log("Sync successful");
    console.log("The result", res);
  })
  .catch((err) => {
    console.error("Sync failed");
    console.error("An error", err);
  });

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

// Routes

app.get("/", (req, res) => {
  res.send("an sql test");
});

app.use("/api/users", registerRouter, loginRouter);

// Error handling middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
