const { Router } = require('express');
const { registrarUsuario, iniciarSesion } = require('../controladores/usuarios.controlador');

const router = Router();

router.post('/usuarios/registro', registrarUsuario);
router.post('/usuarios/login', iniciarSesion);

module.exports = router;
