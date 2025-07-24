const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await pool.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', [nombre, email, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const iniciarSesion = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const usuario = rows[0];
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    res.json({ message: 'Inicio de sesión exitoso', usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
};
