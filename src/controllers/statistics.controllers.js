const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");

const getStatistics = async (req, res) => {
  try {
    const { rows: estudiantes } = await pool.query("SELECT COUNT(*) FROM estudiantes");
    const { rows: profesores } = await pool.query("SELECT COUNT(*) FROM profesores");
    const { rows: cursos } = await pool.query("SELECT COUNT(*) FROM cursos");
    const { rows: asignaturas } = await pool.query("SELECT COUNT(*) FROM asignaturas");

    const totalEstudiantes = parseInt(estudiantes[0].count);
    const totalProfesores = parseInt(profesores[0].count);
    const totalCursos = parseInt(cursos[0].count);
    const totalAsignaturas = parseInt(asignaturas[0].count);

    const estadisticas = {
      totalEstudiantes: totalEstudiantes,
      totalProfesores: totalProfesores,
      totalCursos: totalCursos,
      totalAsignaturas: totalAsignaturas,
    };
    res.status(200).json(response(estadisticas, 200, "ok", "succesfull"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getStatistics,
};
