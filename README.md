Carrito de Compras con Microservicios

Este proyecto es una aplicación web de carrito de compras desarrollada con una arquitectura de microservicios.

La aplicación se compone de los siguientes servicios:

Frontend:
Una aplicación de una sola página (SPA) construida con HTML, CSS y JavaScript.
  
Microservicios Backend:
    * servicio-productos: Gestiona los productos de la tienda.
    * servicio-usuarios: Gestiona los usuarios y la autenticación.
    * servicio-carrito: Gestiona el carrito de compras de los usuarios.
    * Base de Datos: Una base de datos MySQL para la persistencia de los datos.

Modelo de la Base de Datos

El esquema de la base de datos se en el archivo `backend/modelo-db.md`.


## Ejecutar el Proyecto con Docker

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Olivergv1/Actividad-11-Compras-Celulares.git
    cd carrito-de-compras
    ```

2.  **Levantar la aplicación:**
    *   Abre un cmd y ve al proyecto.
    *   Ejecuta el comando:
        ```
        docker-compose up --build
        ```
    *   Este comando construira las imagenes de Docker para cada microservicio y levantara todos los contenedores.

3.  **Crear las tablas de la base de datos:**
    *   Mientras `docker-compose` se está ejecutando, se abre otra terminal.
    *   navega al archivo del proyecto y ejecuta:
        ```
        docker-compose exec db mysql -u root -p
        ```
    *   La contraseña que pide es `rootpassword`
    *   Una vez dentro de la consola de MySQL, copiar y pegar el contenido de `backend/modelo-db.md` para crear las tablas.

4.  **Acceder a la aplicacion:**
    *   Abre tu navegador en  `http://localhost:8080`

5.  **Detener la aplicación:**
    *   En la terminal donde ejecutaste se ejecuto `docker-compose up`, Para detener y eliminar los contenedores:
        ```bash
        docker-compose down
        ```





