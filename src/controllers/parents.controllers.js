const { pool } = require("../database/database");
const { response } = require("../utils/apiResponse");
const { encriptarContraseña, verificarContraseña } = require("../middlewares/authMiddleware");

const getAllParents = async (req, res) => {
  try {
    const { rows: parents } = await pool.query("SELECT * FROM vista_acudientes");
    res.status(200).json(response(parents, 200, "ok", "succesfull"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createParent = async (req, res) => {
  try {
    const { cedula, nombres, apellidos, correo, telefono, usuario, contraseña } = req.body;
    const contraseñaEncriptada = await encriptarContraseña(contraseña);
    await pool.query("CALL registrar_acudiente($1, $2, $3, $4, $5, $6, $7)", [
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
    res.status(500).json(response(null, 400, "incorrecto", "acudiente no registrado debido a errores"));
  }
};

const updateParent = async (req, res) => {
    try {
        const { parent, updatedParent } = req.body;
    
        console.log(req.body);
    
        // Validar los datos de entrada aquí...
    
        const contraseñaActual = updatedParent["contraseña_actual"];
        const contraseñaHasheada = parent["contraseña"];
        const contraseñaNueva = updatedParent["contraseña_nueva"];
    
        const hashedNewPassword = await encriptarContraseña(contraseñaNueva);
    
        const contraseñaValida = await verificarContraseña(contraseñaActual, contraseñaHasheada);
    
        if (!contraseñaValida) {
          return res.status(401).json(response(null, 401, "pass_error", "error"));
        }
    
        const query = "CALL actualizar_acudiente($1, $2, $3, $4, $5, $6, $7, $8)";
        const params = [
          parent.cedula,
          updatedParent.cedula,
          updatedParent.nombres,
          updatedParent.apellidos,
          updatedParent.correo,
          updatedParent.telefono,
          updatedParent.usuario,
          hashedNewPassword,
        ];
    
        await pool.query(query, params);
        res.status(200).json(response(req.body, 200, "correcto", "registro realizado satisfactoriamente"));
      } catch (err) {
        console.error(err);
        return res.status(500).json(response(null, 500, "error", err));
      }
};

const deleteParent = async (req, res) => {
  try {
    const datos = req.body;
    if (datos && Array.isArray(datos) && datos.length > 0) {
      // Verificar la cantidad de registros
      if (datos.length === 1) {
        // Lógica para borrar un solo registro
        const acudiente_cedula = datos[0].cedula;
        console.log(acudiente_cedula);
        await pool.query("DELETE FROM acudientes WHERE cedula = $1", [acudiente_cedula]);
      } else {
        // Lógica para borrar varios registros
        const ids = datos.map((dato) => dato.cedula);
        await pool.query(`DELETE FROM acudientes WHERE cedula = ANY($1::text[])`, [ids]);
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

module.exports = {
  getAllParents,
  createParent,
  updateParent,
  deleteParent,
};
