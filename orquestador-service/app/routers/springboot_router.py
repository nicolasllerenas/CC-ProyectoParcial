from fastapi import APIRouter, HTTPException
from services import api_springboot_service
from models.springboot_models import ProductoCreate, ProductoUpdate

router = APIRouter()

@router.get("/productos")
async def listar_productos():
    try:
        return await api_springboot_service.listar_productos()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/productos/{producto_id}")
async def obtener_producto(producto_id: int):
    try:
        return await api_springboot_service.obtener_producto(producto_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/productos")
async def crear_producto(producto: ProductoCreate):
    try:
        return await api_springboot_service.crear_producto(producto)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/productos/{producto_id}")
async def actualizar_producto(producto_id: int, producto: ProductoUpdate):
    try:
        return await api_springboot_service.actualizar_producto(producto_id, producto)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/productos/{producto_id}")
async def eliminar_producto(producto_id: int):
    try:
        return await api_springboot_service.eliminar_producto(producto_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
