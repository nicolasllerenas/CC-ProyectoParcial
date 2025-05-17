# Usamos una imagen base de Python
FROM python:3.9-slim

# Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos necesarios al contenedor
COPY . /app

# Instalamos las dependencias necesarias
RUN pip install --no-cache-dir -r requirements.txt

# Exponemos el puerto 8000 para acceder al servicio
EXPOSE 8000

# Comando para ejecutar la aplicación con Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
