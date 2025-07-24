const { Router } = require('express');
const { agregarAlCarrito, obtenerCarrito } = require('../controladores/carrito.controlador');

const router = Router();

router.post('/carrito', agregarAlCarrito);
router.get('/carrito/:usuario_id', obtenerCarrito);

module.exports = router;
