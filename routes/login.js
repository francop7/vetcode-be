var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const login = async (req, res) => {
  if (!req.body.user || !req.body.password) {
    return res.status(400).json({ mensaje: "Debe llenar todos los campos." });
  }

  try {
    const user = await User.findOne({user: req.body.user});
    if (!user) {
      res
        .status(400)
        .send({ mensaje: "Error. No existe usuario registrado con este nombre de usuario", user });
      return;
    }
    try {
      const accessToken = jwt.sign({ user }, '2mhzx1s8ert8rmz');

      res.status(200).json({
        token: accessToken,
      });
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
     res.status(404).json({ mensaje: error })
  }
};

router.post('/', login);


module.exports = router;