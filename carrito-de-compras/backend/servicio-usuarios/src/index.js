const express = require('express');
const cors = require('cors');
const usuariosRutas = require('./rutas/usuarios.rutas');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Microservicio de Usuarios');
});

app.use('/api', usuariosRutas);

app.listen(PORT, () => {
  console.log(`Microservicio de Usuarios corriendo en el puerto ${PORT}`);
});
