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

const createActivity = async (req, res) => {
  try {
    const { cedula, nombres, apellidos, correo, telefono } = req.body;
    await pool.query("CALL registrar_acudiente($1, $2, $3, $4, $5)", [cedula, nombres, apellidos, correo, telefono]);

    res.status(201).json(response(req.body, 201, "correcto", "ok"));
  } catch (err) {
    console.error(err);
    res.status(500).json(response(null, 400, "incorrecto", "acudiente no registrado debido a errores"));
  }
};

const updateActivity = async (req, res) => {
  try {
    const { parent, updatedParent } = req.body;

    console.log(req.body);

    const query = "CALL actualizar_acudiente($1, $2, $3, $4, $5, $6)";
    const params = [
      parent.cedula,
      updatedParent.cedula,
      updatedParent.nombres,
      updatedParent.apellidos,
      updatedParent.correo,
      updatedParent.telefono,
    ];

    await pool.query(query, params);
    res.status(200).json(response(req.body, 200, "correcto", "actualizacion realizado satisfactoriamente"));
  } catch (err) {
    console.error(err);
    return res.status(500).json(response(null, 500, "error", err));
  }
};

const deleteActivity = async (req, res) => {
  const parentId = req.params.id;
  try {
    // Lógica para borrar un solo registro
    await pool.query("DELETE FROM acudientes WHERE cedula = $1", [parentId]);
    // Respuesta exitosa
    res.status(200).json(response(null, 200, "ok", "Registros eliminados con exito."));
  } catch (error) {
    console.error("Error al eliminar registros:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
};
