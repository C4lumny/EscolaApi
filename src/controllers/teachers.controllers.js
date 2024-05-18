const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");
const { encriptarContraseña, verificarContraseña } = require("../middlewares/authMiddleware");

const getAllTeachers = async (req, res) => {
  try {
    const { rows: teachers } = await pool.query("SELECT * FROM vista_profesores");
    res.status(200).json(response(teachers, 200, "ok", "correcto"));
  } catch (err) {
    res.status(500).json(response(null, 500, "error", "Error al traer profesores"));
  }
};

const createTeachers = async (req, res) => {
  try {
    const { cedula, nombres, apellidos, correo, telefono, usuario, contraseña } = req.body;
    const contraseñaEncriptada = await encriptarContraseña(contraseña);
    await pool.query("CALL registrar_profesor($1, $2, $3, $4, $5, $6, $7)", [
      cedula,
      nombres,
      apellidos,
      correo,
      telefono,
      usuario,
      contraseñaEncriptada,
    ]);

    res.status(201).json(response(req.body, 201, "correcto", "ok"));
  } catch (err) {
    console.error(err);
    res.status(500).json(response(null, 400, "incorrecto", "profesor no registrado debido a errores"));
  }
};

const deleteTeachers = async (req, res) => {
  const idTeacher = req.params.id;
  try {
    await pool.query("DELETE FROM profesores WHERE cedula = $1", [idTeacher]);
  } catch (error) {
    console.error("Error al eliminar registros:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const updateTeachers = async (req, res) => {
  try {
    const { teacher, updatedTeacher } = req.body;

    console.log(req.body);

    // Validar los datos de entrada aquí...

    const contraseñaActual = updatedTeacher["contraseña_actual"];
    const contraseñaHasheada = teacher["contraseña"];
    const contraseñaNueva = updatedTeacher["contraseña_nueva"];

    const hashedNewPassword = await encriptarContraseña(contraseñaNueva);

    const contraseñaValida = await verificarContraseña(contraseñaActual, contraseñaHasheada);

    if (!contraseñaValida) {
      return res.status(401).json(response(null, 401, "pass_error", "error"));
    }

    const query = "CALL actualizar_profesor($1, $2, $3, $4, $5, $6, $7, $8)";
    const params = [
      teacher.cedula,
      updatedTeacher.cedula,
      updatedTeacher.nombres,
      updatedTeacher.apellidos,
      updatedTeacher.correo,
      updatedTeacher.telefono,
      updatedTeacher.usuario,
      hashedNewPassword,
    ];

    await pool.query(query, params);
    res.status(200).json(response(req.body, 200, "correcto", "registro realizado satisfactoriamente"));
  } catch (err) {
    s;
    console.error(err);
    return res.status(500).json(response(null, 500, "error", err));
  }
};

module.exports = {
  getAllTeachers,
  createTeachers,
  deleteTeachers,
  updateTeachers,
};
