# Usar una imagen base de Node.js
FROM node:18-alpine

# Crear directorio de la aplicación
WORKDIR /src/app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias (y TypeScript globalmente si es necesario)
RUN npm install
RUN npm install -g typescript

# Copiar código fuente
COPY . .

# Dar permisos a los archivos del proyecto (si es necesario)
RUN chmod -R 755 /src/app

# Compilar TypeScript a JavaScript usando npx tsc
RUN npx tsc

# Exponer el puerto necesario
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/app.js"]
