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

const deleteTeachers = async (req, res) => {
  try {
    const datos = req.body;
    if (datos && Array.isArray(datos) && datos.length > 0) {
      // Verificar la cantidad de registros
      if (datos.length === 1) {
        // Lógica para borrar un solo registro
        const profesor_cedula = datos[0].cedula;
        console.log(profesor_cedula);
        await pool.query("DELETE FROM profesores WHERE cedula = $1", [profesor_cedula]);
      } else {
        // Lógica para borrar varios registros
        const ids = datos.map((dato) => dato.cedula);
        await pool.query(`DELETE FROM profesores WHERE cedula = ANY($1::text[])`, [ids]);
      }
      // Respuesta exitosa
      res.status(200).json(response(null, 200, "ok", "Registros eliminados con exito."));
    } else {
      // Datos no válidos
      res.status(400).json({ error: "Datos no válidos." });
    }
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
      return res.status(401).json(response(null, 401, "passwords doesnt match", "error"));
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
    console.error(err);
    return res.status(500).json(response(null, 500, "error", err));
  }
};

module.exports = {
  getAllTeachers,
  deleteTeachers,
  updateTeachers,
};
