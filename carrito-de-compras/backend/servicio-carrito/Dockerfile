# Usar una imagen base de Node.js
FROM node:16

# Crear el directorio de la aplicación
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

COPY . .

# Exponer el puerto que usa la aplicación
EXPOSE 3003

# Comando para iniciar la aplicación
CMD [ "node", "src/index.js" ]
