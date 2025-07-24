const express = require('express');
const cors = require('cors');
const productosRutas = require('./rutas/productos.rutas');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Microservicio de Productos');
});

app.use('/api', productosRutas);

app.listen(PORT, () => {
  console.log(`Microservicio de Productos corriendo en el puerto ${PORT}`);
});
