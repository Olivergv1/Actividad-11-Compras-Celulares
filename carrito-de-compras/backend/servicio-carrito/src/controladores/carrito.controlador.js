const pool = require('../config/db');

const agregarAlCarrito = async (req, res) => {
  const { usuario_id, producto_id, cantidad } = req.body;
  try {
    // a ver si ya tiene un carrito
    let [carritoRows] = await pool.query('SELECT * FROM carrito WHERE usuario_id = ?', [usuario_id]);
    let carrito_id;

    if (carritoRows.length > 0) {
      carrito_id = carritoRows[0].id;
    } else {
      //no tiene, etonc le creo uno nuevo
      const [result] = await pool.query('INSERT INTO carrito (usuario_id) VALUES (?)', [usuario_id]);
      carrito_id = result.insertId;
    }

    //ver si el producto ya esta metido en el carrito
    const [itemRows] = await pool.query('SELECT * FROM carrito_items WHERE carrito_id = ? AND producto_id = ?', [carrito_id, producto_id]);

    if (itemRows.length > 0) {
      // Si el producto ya esta, solo le sumo la cantidad y listo
      const nuevaCantidad = itemRows[0].cantidad + cantidad;
      await pool.query('UPDATE carrito_items SET cantidad = ? WHERE id = ?', [nuevaCantidad, itemRows[0].id]);
    } else {
      // el producto no esta, asi que lo meto
      await pool.query('INSERT INTO carrito_items (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)', [carrito_id, producto_id, cantidad]);
    }

    res.status(201).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const obtenerCarrito = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT p.nombre, p.precio, ci.cantidad
       FROM carrito_items ci
       JOIN productos p ON ci.producto_id = p.id
       JOIN carrito c ON ci.carrito_id = c.id
       WHERE c.usuario_id = ?`,
      [usuario_id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
};
