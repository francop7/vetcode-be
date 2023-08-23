var express = require("express");
var router = express.Router();
const Patients = require("../models/patients");

const postPatients = async (req, res) => {
  const { nombre, apellido, eMail, telefono, nombreMascota, especie, raza } =
    req.body;
    console.log(req.body)
  try {
    const newPatient = new Patients({
      nombre,
      apellido,
      eMail,
      telefono,
      nombreMascota,
      especie,
      raza
    });

    const patient = await newPatient.save();
    res.status(201).json(patient.id);
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patients.find({})
    return res.status(200).json(patients);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

const getPatient = async (req, res) => {
  try {
    const patient = await Patients.findById(req.params.id)
    return res.status(200).json(patient);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

const putPatients = async (req, res) => {
  console.log(req.params.id, req.body)
  try {
    await Patients.findByIdAndUpdate(req.params.id, req.body)
    
    res.status(200).json({ mensaje: "Genial! el cliente ha sido modificado exitosamente" })
  }
  catch (error) {
    res.status(500).json({
      msg: error
    })
  }
};

const deletePatient = async (req, res) => {
  const patient = await Patients.findByIdAndDelete(req.params.id);

  if (!patient) {
    res.status(400);
    throw new Error('Todo not found');
  }

  // await turno.remove();

  res.status(200).json({ id: req.params.id });
}

/* GET users listing. */
router.post("/", postPatients);
router.get("/", getAllPatients);
router.put('/:id', putPatients);
router.get('/:id', getPatient);
router.delete('/:id', deletePatient);


module.exports = router;
