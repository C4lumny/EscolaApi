const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");
const { encriptarContraseña, verificarContraseña } = require("../middlewares/authMiddleware");

const getAllStudents = async (req, res) => {
  try {
    const { rows: students } = await pool.query("SELECT * FROM estudiantes");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createStudent = async (req, res) => {
  try {
    const { cedula, nombres, apellidos, correo, telefono, usuario, contraseña } = req.body;
    const contraseñaEncriptada = await encriptarContraseña(contraseña);
    await pool.query("CALL registrar_profesor($1, $2, $3, $4, $5, $6, $7)", [cedula, nombres, apellidos, correo, telefono, usuario, contraseñaEncriptada]);

    res.status(201).json(response(req.body, 201, "correcto", "ok"));
  } catch (err) {
    console.error(err);
    res.status(500).json(response(null, 400, "incorrecto", "profesor no registrado debido a errores"));
  }
};

const updateStudent = (req, res) => {
  res.send("Updating student");
};

const deleteStudent = (req, res) => {
  res.send("Deleting student");
};

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};
