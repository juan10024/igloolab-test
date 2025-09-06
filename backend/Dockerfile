# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el código de TypeScript a JavaScript
RUN npm run build

# Expone el puerto que tu aplicación usa (por defecto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
