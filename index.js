var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const dataBase = require("./database/database");
var indexRouter = require("./api/index");
var usersRouter = require("./api/users");
const turnosRouter = require("./api/turnos");
const patientsRouter = require("./api/patients");
const loginRouter = require("./api/login");
const registerRouter = require("./api/register");

var cors = require("cors");

var app = express();
app.use(cors("*"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/turnos", turnosRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.use(dataBase);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
