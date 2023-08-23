var express = require("express");
var router = express.Router();
const Turnos = require("../models/turnos");

const postTurnos = async (req, res) => {
  const { TurnoPetName, TurnoDoctor, TurnoDetalle, TurnoFecha, TurnoHora } =
    req.body;
  try {
    const newTurno = new Turnos({
      TurnoPetName,
      TurnoDoctor,
      TurnoDetalle,
      TurnoFecha,
      TurnoHora,
    });

    const turno = await newTurno.save();
    res.status(201).json(turno.id);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const getAllTurnos = async (req, res) => {
  try {
    const turnos = await Turnos.find({})
    return res.status(200).json(turnos);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

const getTurno = async (req, res) => {
  try {
    const turno = await Turnos.findById(req.params.id)
    return res.status(200).json(turno);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

const putTurnos = async (req, res) => {
  console.log(req.params.id, req.body)
  try {
    await Turnos.findByIdAndUpdate(req.params.id, req.body)
    
    res.status(200).json({ mensaje: "Genial! Tu turno ha sido modificado exitosamente" })
  }
  catch (error) {
    res.status(500).json({
      msg: error
    })
  }
};

const deleteTurno = async (req, res) => {
  const turno = await Turnos.findByIdAndDelete(req.params.id);

  if (!turno) {
    res.status(400);
    throw new Error('Todo not found');
  }

  // await turno.remove();

  res.status(200).json({ id: req.params.id });
}

/* GET users listing. */
router.post("/", postTurnos);
router.get("/", getAllTurnos);
router.put('/:id', putTurnos);
router.get('/:id', getTurno);
router.delete('/:id', deleteTurno);


module.exports = router;
