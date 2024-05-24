const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");

const getDevelopmentByActivity = async (req, res) => {
  const activityId = req.params.id;

  try {
    const { rows: teachers } = await pool.query("SELECT * FROM soluciones WHERE id_actividad = $1", [activityId]);
    res.status(200).json(response(teachers, 200, "ok", "correcto"));
  } catch (err) {
    res.status(500).json(response(null, 500, "error", "Error al traer profesores"));
  }
};

const getAllDevelopments = async (req, res) => {
  try {
    const { rows: teachers } = await pool.query("SELECT * FROM soluciones");
    res.status(200).json(response(teachers, 200, "ok", "correcto"));
  } catch (err) {
    res.status(500).json(response(null, 500, "error", "Error al traer profesores"));
  }
};

const createDevelopment = async (req, res) => {
  try {
    console.log(req.body);
    const { id_actividad, id_estudiante, respuesta } = req.body;

    await pool.query("CALL registrar_soluciones($1, $2, $3, $4)", [null, respuesta, id_estudiante, id_actividad]);
    res.status(200).json(response(req.body, 200, "ok", "correcto"));
  } catch (error) {
    console.log(error);
    res.status(500).json(response(null, 500, "error", "Error al registrar curso"));
  }
};

const deleteDevelopments = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM soluciones WHERE id = $1", [id]);
    // Respuesta exitosa
    res.status(200).json(response(null, 200, "ok", "Registros eliminados con exito."));
  } catch (error) {
    console.error("Error al eliminar registros:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

const updateDevelopments = async (req, res) => {
  try {
    const { id_actividad, id_estudiante, respuesta, solucion_id } = req.body;

    console.log("me estoy activando");

    const query = "CALL actualizar_soluciones($1, $2, $3, $4, $5)";
    const params = [solucion_id, id_estudiante, id_actividad, null, respuesta];

    await pool.query(query, params);
    res.status(200).json(response(req.body, 200, "correcto", "registro realizado satisfactoriamente"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(response(null, 500, "error", err));
  }
};

module.exports = {
  getDevelopmentByActivity,
  getAllDevelopments,
  createDevelopment,
  deleteDevelopments,
  updateDevelopments,
};
