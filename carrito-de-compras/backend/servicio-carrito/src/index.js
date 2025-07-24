const express = require('express');
const cors = require('cors');
const carritoRutas = require('./rutas/carrito.rutas');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Microservicio de Carrito');
});

app.use('/api', carritoRutas);

app.listen(PORT, () => {
  console.log(`Microservicio de Carrito corriendo en el puerto ${PORT}`);
});
