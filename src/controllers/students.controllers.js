const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");
const { encriptarContraseña, verificarContraseña } = require("../middlewares/authMiddleware");

const getAllStudents = async (req, res) => {
  try {
    const { rows: students } = await pool.query("SELECT * FROM vista_estudiantes");
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

const updateStudent = async (req, res) => {
  try {
    const { student, updatedStudent } = req.body;

    console.log(req.body);

    // Validar los datos de entrada aquí...

    const contraseñaActual = updatedStudent["contraseña_actual"];
    const contraseñaHasheada = student["contraseña"];
    const contraseñaNueva = updatedStudent["contraseña_nueva"];

    const hashedNewPassword = await encriptarContraseña(contraseñaNueva);

    const contraseñaValida = await verificarContraseña(contraseñaActual, contraseñaHasheada);

    if (!contraseñaValida) {
      return res.status(401).json(response(null, 401, "pass_error", "error"));
    }

    const query = "CALL actualizar_estudiante($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const params = [
      student.identificacion,
      updatedStudent.tipo_documento,
      updatedStudent.identificacion,
      updatedStudent.nombres,
      updatedStudent.apellidos,
      updatedStudent.usuario,
      hashedNewPassword,
      updatedStudent.cedula_acudiente,
      updatedStudent.id_curso,
    ];

    await pool.query(query, params);
    res.status(200).json(response(req.body, 200, "correcto", "registro realizado satisfactoriamente"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(response(null, 500, "error", err));
  }
};

const deleteStudent = async (req, res) => {
  try {
    const datos = req.body;
    if (datos && Array.isArray(datos) && datos.length > 0) {
      // Verificar la cantidad de registros
      if (datos.length === 1) {
        // Lógica para borrar un solo registro
        const estudiante_identificacion = datos[0].identificacion;
        console.log(estudiante_identificacion);
        await pool.query("DELETE FROM estudiantes WHERE identificacion = $1", [estudiante_identificacion]);
      } else {
        // Lógica para borrar varios registros
        const ids = datos.map((dato) => dato.identificacion);
        await pool.query(`DELETE FROM estudiantes WHERE identificacion = ANY($1::text[])`, [ids]);
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

const getStudentInfoById = async(req, res) => {
  try {
    const studentId = req.params.id;
    const query = 'SELECT e.nombres, e.apellidos, e.id_cursos FROM estudiantes e WHERE e.identificacion = $1';
    const { rows: students } = await pool.query(query, [studentId])
    res.json(students[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.toString() }); // En caso de error, envía el error como respuesta
  }
};



module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentInfoById
};
