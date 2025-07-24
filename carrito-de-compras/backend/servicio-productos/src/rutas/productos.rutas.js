const { Router } = require('express');
const { obtenerProductos, obtenerProductoPorId } = require('../controladores/productos.controlador');

const router = Router();

router.get('/productos', obtenerProductos);
router.get('/productos/:id', obtenerProductoPorId);

module.exports = router;
