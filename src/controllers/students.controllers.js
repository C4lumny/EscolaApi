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
    const { nro_documento, nombres, apellidos, usuario, contraseña, associated_course, associated_parent } = req.body;
    const document_type = parseInt(req.body.document_type);
    const contraseñaEncriptada = await encriptarContraseña(contraseña);
    const query = "CALL registrar_estudiante($1, $2, $3, $4, $5, $6, $7, $8)";
    const params = [
      document_type,
      nro_documento,
      nombres,
      apellidos,
      usuario,
      contraseñaEncriptada,
      associated_parent,
      associated_course,
    ];

    await pool.query(query, params);

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
