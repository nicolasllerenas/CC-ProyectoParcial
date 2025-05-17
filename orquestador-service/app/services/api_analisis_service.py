from utils.http_client import client

BASE_URL_ANALISIS = "http://localhost:8082"  

async def upload_file(file):
    """Envía un archivo CSV a la API de análisis."""
    files = {"file": (file.filename, await file.read(), file.content_type)}
    response = await client.post(f"{BASE_URL_ANALISIS}/upload/", files=files)
    response.raise_for_status()
    return response.json()

async def generar_grafico():
    """Solicita que la API de análisis genere un gráfico."""
    response = await client.get(f"{BASE_URL_ANALISIS}/analisis/generar_grafico")
    response.raise_for_status()
    return response.json()

async def obtener_estadisticas():
    """Solicita estadísticas básicas del dataset cargado."""
    response = await client.get(f"{BASE_URL_ANALISIS}/analisis/estadisticas")
    response.raise_for_status()
    return response.json()
