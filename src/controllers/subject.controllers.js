const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");

const getAllSubjects = async (req, res) => {
  try {
    const { rows: subjects } = await pool.query("SELECT * FROM vista_asignaturas");
    res.status(200).json(response(subjects, 200, "ok", "correcto"));
  } catch (err) {
    res.status(500).json(response(null, 500, "error", "Error al traer asignaturas"));
  }
};

const createSubjects = async (req, res) => {
  try {
    console.log(req.body);
    const { nombre, descripcion, associated_teacher, associated_course } = req.body;
    const params = [ nombre, descripcion, associated_teacher, associated_course ]
    const query = "CALL registrar_asignatura($1, $2, $3, $4)"

    await pool.query(query, params);
    res.status(200).json(response(req.body, 200, "ok", "correcto"));
  } catch (error) {
    res.status(500).json(response(null, 500, "error", "Error al registrar asignatura"));
  }
};

const deleteSubjects = async (req, res) => {
  try {
    const datos = req.body;
    if (datos && Array.isArray(datos) && datos.length > 0) {
      // Verificar la cantidad de registros
      if (datos.length === 1) {
        // Lógica para borrar un solo registro
        const id_curso = datos[0].id;
        console.log(id_curso);
        await pool.query("DELETE FROM asignaturas WHERE id = $1", [id_curso]);
      } else {
        // Lógica para borrar varios registros
        const ids = datos.map((dato) => dato.id);
        await pool.query(`DELETE FROM asignaturas WHERE id = ANY($1::text[])`, [ids]);
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

const updateSubjects = async (req, res) => {
  try {
    const { subject, updatedSubject } = req.body;
    console.log(subject, updatedSubject);

    const query = "CALL actualizar_asignatura($1, $2, $3, $4, $5)";
    const params = [
      subject.id,
      updatedSubject.nombre,
      updatedSubject.descripcion,
      updatedSubject.associated_teacher,
      updatedSubject.associated_course,
    ];

    await pool.query(query, params);
    res.status(200).json(response(req.body, 200, "correcto", "registro realizado satisfactoriamente"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(response(null, 500, "error", err));
  }
};

const getSubjectsByStudentId = async(req, res) => {
  try {
    const studentId = req.params.id;
    const query = 'SELECT a.* FROM asignaturas a JOIN estudiantes e on e.identificacion = $1';
    const { rows: subjects } = await pool.query(query, [studentId])
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.toString() }); // En caso de error, envía el error como respuesta
  }
};

module.exports = {
  getAllSubjects,
  createSubjects,
  deleteSubjects,
  updateSubjects,
  getSubjectsByStudentId,
};
