const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");

const getAllActivities = async (req, res) => {
  try {
    const { rows: parents } = await pool.query("SELECT * FROM vista_actividades");
    res.status(200).json(response(parents, 200, "ok", "succesfull"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllActiveActivities = async (req, res) => {
  const studentId = req.params.id;

  try {
    const { rows: parents } = await pool.query("SELECT * FROM obtener_actividades_activas_por_estudiante($1)", [studentId]);
    res.status(200).json(response(parents, 200, "ok", "succesfull"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSubjectActivities = async (req, res) => {
  const subjectId = parseInt(req.params.id);

  try {
    const { rows: parents } = await pool.query("SELECT * FROM obtener_actividades_activas_por_asignatura($1)", [subjectId]);
    res.status(200).json(response(parents, 200, "ok", "succesfull"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const activity = req.body;
    const params = [
      activity.titulo,
      activity.descripcion,
      activity.date.from,
      activity.date.to,
      parseInt(activity.asignatura),
      parseInt(activity.estado) == 0 ? false : true,
    ];  
    const query = "CALL registrar_actividad($1, $2, $3, $4, $5, $6)";
    await pool.query(query, params);

    res.status(201).json(response(req.body, 201, "correcto", "ok"));
  } catch (err) {
    console.error(err);
    res.status(500).json(response(null, 400, "incorrecto", "actividad no registrado debido a errores"));
  }
};

const updateActivity = async (req, res) => {
  try {
    const { activity, updatedActivity } = req.body;

    console.log(req.body);

    const query = "CALL actualizar_actividad($1, $2, $3, $4, $5, $6, $7)";
    const params = [
      activity.id,
      updatedActivity.titulo,
      updatedActivity.descripcion,
      updatedActivity.date.from,
      updatedActivity.date.to,
      parseInt(updatedActivity.asignatura),
      parseInt(updatedActivity.estado) == 0 ? false : true,
    ];

    await pool.query(query, params);
    res.status(200).json(response(req.body, 200, "correcto", "actualizacion realizado satisfactoriamente"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(response(null, 500, "error", err));
  }
};

const deleteActivity = async (req, res) => {
  const activityID = req.params.id;
  try {
    // Lógica para borrar un solo registro
    await pool.query("DELETE FROM actividades WHERE id = $1", [activityID]);
    // Respuesta exitosa
    res.status(200).json(response(null, 200, "ok", "Registros eliminados con exito."));
  } catch (error) {
    console.error("Error al eliminar registros:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getAllActivities,
  getAllActiveActivities,
  getAllSubjectActivities,
  createActivity,
  updateActivity,
  deleteActivity,
};
