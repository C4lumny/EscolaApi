const bcrypt = require('bcryptjs');

// Función para encriptar la contraseña usando hashing y salting con bcryptjs
const encriptarContraseña = async (password) => {
    try {
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        return null;
    }
};

//Funcion que recibe la contraseña ingresada y la hasheada (que viene de la BD) y las compara.
const verificarContraseña = async (passwordIngresada, passwordHasheada) => {
    try {
      const esCorrecta = await bcrypt.compare(passwordIngresada, passwordHasheada);
      return esCorrecta;
    } catch (error) {
      console.error('Error al verificar la contraseña:', error);
      return false;
    }
  };

module.exports = {
  encriptarContraseña,
  verificarContraseña,
}