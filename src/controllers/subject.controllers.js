const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");

const getAllSubjects = async (req, res) => {
  try {
    const { rows: teachers } = await pool.query("SELECT * FROM vista_asignaturas");
    res.status(200).json(response(teachers, 200, "ok", "correcto"));
  } catch (err) {
    res.status(500).json(response(null, 500, "error", "Error al traer profesores"));
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
        await pool.query("DELETE FROM cursos WHERE id = $1", [id_curso]);
      } else {
        // Lógica para borrar varios registros
        const ids = datos.map((dato) => dato.id);
        await pool.query(`DELETE FROM cursos WHERE id = ANY($1::text[])`, [ids]);
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
    const { course, updatedCourse } = req.body;
    console.log(course, updatedCourse);

    const query = "CALL actualizar_curso($1, $2)";
    const params = [
      course.id,
      updatedCourse.id,
    ];

    await pool.query(query, params);
    res.status(200).json(response(req.body, 200, "correcto", "registro realizado satisfactoriamente"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(response(null, 500, "error", err));
  }
};

module.exports = {
  getAllSubjects,
  createSubjects,
  deleteSubjects,
  updateSubjects,
};