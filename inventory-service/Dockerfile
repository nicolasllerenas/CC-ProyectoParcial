# Imagen base con JDK
FROM openjdk:21-jdk-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo JAR al contenedor	
COPY target/ProyectoCloud-0.0.1-SNAPSHOT.jar app.jar



# Expone el puerto definido por la variable de entorno
EXPOSE ${SERVER_PORT}

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
