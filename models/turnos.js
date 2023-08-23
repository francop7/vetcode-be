const mongoose = require("mongoose");
const { Schema } = mongoose;

const Turnos = new Schema(
  {
    TurnoPetName: {
      required: true,
      type: String,
    },
    TurnoDoctor: {
      required: true,
      type: String,
    },
    TurnoDetalle: {
      required: true,
      type: String,
    },
    TurnoFecha: {
      required: true,
      type: String,
    },
    TurnoHora: {
      required: true,
      type: String,
    },
  }
);

module.exports = mongoose.model("turnos", Turnos); 