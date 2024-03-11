const { encriptarContraseña, verificarContraseña } = require("../middlewares/authMiddleware");
const { pool } = require("../database/database");
const { response } = require('../utils/apiResponse')
const jwt = require('jsonwebtoken');

const registroAcudiente = (req, res) => {
  // Lógica de registro para acudientes
  // ...
  
  res.json({ mensaje: "Registro de acudiente exitoso" });
};

const registroAdministrador = async (req, res) => {
  try {
    const { usuario, contraseña, cedula } = req.body;
    const contraseñaEncriptada = await encriptarContraseña(contraseña);
    await pool.query("CALL registrar_administrador($1, $2, $3)", [usuario, contraseñaEncriptada, cedula]);

    res.status(201).json(response(req.body, 201, "ok", "registro satisfactorio"));
  } catch (err) {
    res.status(500).json(response(null, 400, "incorrect", "registro insatisfactorio"));
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const query = "SELECT * FROM obtener_userInfo($1)";
    const dbRes = await pool.query(query, [username]);
    const usuario = dbRes.rows[0];

    if (!usuario) {
      return res.status(400).json(response(null, 400, 'error', 'Usuario no encontrado'));
    }

    const contraseñaValida = await verificarContraseña(password, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(400).json(response(null, 400, 'error', 'Contraseña incorrecta'));
    }

    const user = {
      usuario: usuario.username,
      tipo_usuario: usuario.tipo_usuario,
      identificacion: usuario.identificacion,
    }

    res.status(200).json(response(user, 200, 'ok', 'Inicio de sesión correcto'));
  } catch (error) {
    res.status(400).json(response(null, 400, 'error', 'Error al iniciar sesión'));
  }
};

module.exports = {
  registroAcudiente,
  registroAdministrador,
  login,
};
