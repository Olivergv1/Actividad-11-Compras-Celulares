document.addEventListener('DOMContentLoaded', () => {
    // URLs de las APIs
    const API_PRODUCTOS = 'http://localhost:3001/api/productos';
    const API_USUARIOS_REGISTRO = 'http://localhost:3002/api/usuarios/registro';
    const API_USUARIOS_LOGIN = 'http://localhost:3002/api/usuarios/login';
    const API_CARRITO = 'http://localhost:3003/api/carrito';

    // Elementos del DOM
    const productosContenedor = document.querySelector('#productos-contenedor');
    const carritoItemsContenedor = document.querySelector('#carrito-items');
    const carritoTotalEl = document.querySelector('#carrito-total');
    const userInfoEl = document.querySelector('#user-info');

    const secciones = {
        inicio: document.querySelector('#inicio'),
        productos: document.querySelector('#productos'),
        carrito: document.querySelector('#carrito'),
        login: document.querySelector('#login'),
        registro: document.querySelector('#registro'),
    };

    const navLinks = {
        productos: document.querySelector('#ver-productos'),
        carrito: document.querySelector('#ver-carrito'),
        login: document.querySelector('#ver-login'),
        registro: document.querySelector('#ver-registro'),
        cerrarSesion: document.querySelector('#cerrar-sesion'),
    };

    let usuarioActual = null;

                //Logica de Navegacion y Estado de Sesio
    const mostrarSeccion = (nombreSeccion) => {
        Object.values(secciones).forEach(seccion => seccion.style.display = 'none');
        secciones[nombreSeccion].style.display = 'block';
    };

    const actualizarVista = () => {
        const usuarioGuardado = localStorage.getItem('usuarioActual');
        if (usuarioGuardado) {
            usuarioActual = JSON.parse(usuarioGuardado);
            navLinks.login.style.display = 'none';
            navLinks.registro.style.display = 'none';
            navLinks.productos.style.display = 'inline';
            navLinks.carrito.style.display = 'inline';
            navLinks.cerrarSesion.style.display = 'inline';
            userInfoEl.textContent = `Hola, ${usuarioActual.nombre}`;
            userInfoEl.style.display = 'inline';
            mostrarSeccion('productos');
            cargarProductos();
        } else {
            usuarioActual = null;
            navLinks.login.style.display = 'inline';
            navLinks.registro.style.display = 'inline';
            navLinks.productos.style.display = 'none';
            navLinks.carrito.style.display = 'none';
            navLinks.cerrarSesion.style.display = 'none';
            userInfoEl.style.display = 'none';
            mostrarSeccion('inicio');
        }
    };

    navLinks.productos.addEventListener('click', (e) => { e.preventDefault(); mostrarSeccion('productos'); });
    navLinks.carrito.addEventListener('click', (e) => { e.preventDefault(); mostrarSeccion('carrito'); cargarCarrito(); });
    navLinks.login.addEventListener('click', (e) => { e.preventDefault(); mostrarSeccion('login'); });
    navLinks.registro.addEventListener('click', (e) => { e.preventDefault(); mostrarSeccion('registro'); });
    navLinks.cerrarSesion.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioActual');
        actualizarVista();
    });

                //Logica de Productos
    const cargarProductos = async () => {
        try {
            const respuesta = await fetch(API_PRODUCTOS);
            if (!respuesta.ok) throw new Error('Error al cargar productos');
            const productos = await respuesta.json();

            productosContenedor.innerHTML = '';
            productos.forEach(producto => {
                const productoEl = document.createElement('div');
                productoEl.classList.add('producto');
                productoEl.innerHTML = `
                    <img src="${producto.imagen_url || 'https://via.placeholder.com/150'}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p class="precio">$${producto.precio}</p>
                    <button class="agregar-carrito btn" data-id="${producto.id}">Agregar al Carrito</button>
                `;
                productosContenedor.appendChild(productoEl);
            });
        } catch (error) {
            productosContenedor.innerHTML = `<p>Error al cargar los productos: ${error.message}. Asegúrate de que los microservicios estén corriendo.</p>`;
        }
    };

            //Logica de Autenticacion
    const registroForm = document.querySelector('#registro-form');
    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.querySelector('#registro-nombre').value;
        const email = document.querySelector('#registro-email').value;
        const password = document.querySelector('#registro-password').value;

        try {
            const respuesta = await fetch(API_USUARIOS_REGISTRO, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password }),
            });
            const data = await respuesta.json();
            alert(data.message);
            if (respuesta.ok) {
                mostrarSeccion('login');
            }
        } catch (error) {
            alert(`Error al registrarse: ${error.message}`);
        }
    });

    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.querySelector('#login-email').value;
        const password = document.querySelector('#login-password').value;

        try {
            const respuesta = await fetch(API_USUARIOS_LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await respuesta.json();
            if (!respuesta.ok) {
                throw new Error(data.message || 'Error en el inicio de sesión');
            }
            localStorage.setItem('usuarioActual', JSON.stringify(data.usuario));
            actualizarVista();
        } catch (error) {
            alert(`Error al iniciar sesión: ${error.message}`);
        }
    });

            //Logica de Carrito
    productosContenedor.addEventListener('click', async (e) => {
        if (e.target.classList.contains('agregar-carrito')) {
            if (!usuarioActual) {
                alert('.');
                return;
            }
            const productoId = e.target.dataset.id;

            try {
                const respuesta = await fetch(API_CARRITO, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario_id: usuarioActual.id, producto_id: productoId, cantidad: 1 }),
                });
                const data = await respuesta.json();
                alert(data.message);
            } catch (error) {
                alert(`Error al agregar al carrito: ${error.message}`);
            }
        }
    });

    const cargarCarrito = async () => {
        if (!usuarioActual) return;
        try {
            const respuesta = await fetch(`${API_CARRITO}/${usuarioActual.id}`);
            if (!respuesta.ok) throw new Error('Error al cargar el carrito');
            const items = await respuesta.json();

            carritoItemsContenedor.innerHTML = '';
            let total = 0;
            items.forEach(item => {
                const itemEl = document.createElement('li');
                itemEl.textContent = `${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio}`;
                carritoItemsContenedor.appendChild(itemEl);
                total += item.precio * item.cantidad;
            });
            carritoTotalEl.textContent = total.toFixed(2);
        } catch (error) {
            carritoItemsContenedor.innerHTML = `<li>Error al cargar el carrito: ${error.message}</li>`;
        }
    };

    // Carga inicial
    actualizarVista();
});
