from utils.http_client import client
from models.springboot_models import ProductoCreate, ProductoUpdate

BASE_URL_SPRINGBOOT = "http://localhost:8081"

async def listar_productos():
    response = await client.get(f"{BASE_URL_SPRINGBOOT}/productos")
    response.raise_for_status()
    return response.json()

async def obtener_producto(producto_id: int):
    response = await client.get(f"{BASE_URL_SPRINGBOOT}/productos/{producto_id}")
    response.raise_for_status()
    return response.json()

async def crear_producto(producto: ProductoCreate):
    response = await client.post(f"{BASE_URL_SPRINGBOOT}/productos", json=producto.dict())
    response.raise_for_status()
    return response.json()

async def actualizar_producto(producto_id: int, producto: ProductoUpdate):
    response = await client.put(f"{BASE_URL_SPRINGBOOT}/productos/{producto_id}", json=producto.dict())
    response.raise_for_status()
    return response.json()

async def eliminar_producto(producto_id: int):
    response = await client.delete(f"{BASE_URL_SPRINGBOOT}/productos/{producto_id}")
    response.raise_for_status()
    return response.json()
