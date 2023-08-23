var express = require('express');
var router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")

const register = async (req, res) => {
  try {
    if (
      !req.body.user ||
      !req.body.password
    ) {
      return res.status(400).json({ mensaje: "Debe llenar todos los campos." });
    }
    if (req.body.password.length < 5) {
      return res.status(400).json({
        mensaje: "El password debe tener al menos 5 caracteres de largo.",
      });
    }

    const userExistente = await User.findOne({
      user: req.body.user,
    });

    if (userExistente) {
      return res
        .status(400)
        .json({ mensaje: "Intentalo nuevamente mas tarde." });
    }

    const password = req.body.password;
    let passwordHash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new User({
      user: req.body.user,
      password: passwordHash,
    });

    await nuevoUsuario.save();
    res.status(201).json({
      mensaje: "Usuario creada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: "Error al crear Usuario" });
  }
};

router.post('/', register);

module.exports = router;