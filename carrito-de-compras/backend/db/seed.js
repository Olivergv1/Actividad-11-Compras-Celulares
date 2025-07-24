const mysql = require('mysql2/promise');

// la lista de productos
const productos = [
    { nombre: 'iPhone 14 Pro', descripcion: 'El último iPhone con Dynamic Island y cámara de 48MP.', precio: 999.99, imagen_url: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-14-pro-max-deeppurple-202404?wid=2000&hei=1897&fmt=jpeg&qlt=95&.v=1713200629707' },
    { nombre: 'Samsung Galaxy S23 Ultra', descripcion: 'Potencia y versatilidad con S Pen integrado.', precio: 1199.99, imagen_url: 'https://tse3.mm.bing.net/th/id/OIP.vzBQ-KNumPgKm1A1snGlFwHaHa?w=768&h=768&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { nombre: 'Google Pixel 7 Pro', descripcion: 'La mejor experiencia de Android con una cámara excepcional.', precio: 899.00, imagen_url: 'https://utelfzco.com/wp-content/uploads/2023/06/google-pixel-7-pro.jpg' },
    { nombre: 'OnePlus 11', descripcion: 'Rendimiento de buque insignia a un precio competitivo.', precio: 699.00, imagen_url: 'https://tse1.mm.bing.net/th/id/OIP.yU9MRZReCQKYBlFIC-r2TAHaH6?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { nombre: 'Xiaomi 13 Pro', descripcion: 'Cámara co-diseñada con Leica y carga ultra rápida.', precio: 949.00, imagen_url: 'https://tse1.mm.bing.net/th/id/OIP.C5b-0ng_gFd8wKWwg0RUeQHaIR?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { nombre: 'Sony Xperia 1 V', descripcion: 'Para creadores de contenido, con enfoque en video y fotografía.', precio: 1399.00, imagen_url: 'https://gsmpro.cl/cdn/shop/files/sony-xperia-1-v_1024x.jpg?v=1686762410' },
    { nombre: 'Asus ROG Phone 7', descripcion: 'El smartphone definitivo para gaming.', precio: 999.00, imagen_url: 'https://tse2.mm.bing.net/th/id/OIP.rC403k3iZ478klTomHeGMAHaHa?w=500&h=500&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { nombre: 'Motorola Edge 40 Pro', descripcion: 'Diseño elegante y una experiencia de Android limpia.', precio: 899.99, imagen_url: 'https://tse4.mm.bing.net/th/id/OIP.6zHsaziUkk9ccdqcmtmQZwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { nombre: 'Nothing Phone (2)', descripcion: 'Diseño innovador con la interfaz Glyph.', precio: 599.00, imagen_url: 'https://tse4.mm.bing.net/th/id/OIP.udhn25dMdX1N-FT9V4JZXgHaHo?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { nombre: 'Huawei P60 Pro', descripcion: 'Fotografía de vanguardia con apertura variable.', precio: 1199.00, imagen_url: 'https://tse2.mm.bing.net/th/id/OIP.VBffZWvk9ixdNlV4ILQmYgHaPI?rs=1&pid=ImgDetMain&o=7&rm=3' }
];

async function seed() {
    console.log('Iniciando el seeder...');
    let connection;
    try {
        // conectando a la db
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'rootpassword',
            database: process.env.DB_DATABASE || 'tienda_db',
            connectTimeout: 20000
        });

        console.log('Conexion a la base de datos exitosa.');

        // Crear la tabla si no esta
        await connection.query(`
            CREATE TABLE IF NOT EXISTS productos (
              id INT NOT NULL AUTO_INCREMENT,
              nombre VARCHAR(255) NOT NULL,
              descripcion TEXT,
              precio DECIMAL(10, 2) NOT NULL,
              imagen_url VARCHAR(255),
              PRIMARY KEY (id)
            );
        `);
        console.log('Tabla "productos" asegurada.');

        // insertar los productos
        for (const producto of productos) {
            await connection.query('INSERT INTO productos (nombre, descripcion, precio, imagen_url) VALUES (?, ?, ?, ?)',
                [producto.nombre, producto.descripcion, producto.precio, producto.imagen_url]);
        }

        console.log('Se han insertado 10 productos de ejemplo.');

    } catch (error) {
        console.error('Error durante el seeding:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Conexion a la base de datos cerrada.');
        }
        console.log('Seeder finalizado.');
    }
}

seed();