from fastapi import APIRouter, UploadFile, File, HTTPException
from services import api_analisis_service

router = APIRouter()

@router.post("/subir-csv")
async def subir_csv(file: UploadFile = File(...)):
    try:
        result = await api_analisis_service.upload_file(file)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/grafico")
async def ver_grafico():
    try:
        result = await api_analisis_service.generar_grafico()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/estadisticas")
async def ver_estadisticas():
    try:
        result = await api_analisis_service.obtener_estadisticas()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
