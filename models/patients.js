const mongoose = require("mongoose");
const { Schema } = mongoose;

const Patients = new Schema(
  {
    nombre: {
      required: true,
      type: String,
    },
    apellido: {
      required: true,
      type: String,
    },
    eMail: {
      required: true,
      type: String,
    },
    telefono: {
      required: true,
      type: Number,
    },
    nombreMascota: {
      required: true,
      type: String,
    },
    especie: {
      required: true,
      type: String,
    },
    raza: {
      required: true,
      type: String,
    },
  }
);

module.exports = mongoose.model("patients", Patients); 