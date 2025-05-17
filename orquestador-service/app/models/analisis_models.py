from pydantic import BaseModel
from typing import Dict

class EstadisticasResponse(BaseModel):
    promedio: float
    mediana: float
    desviacion_estandar: float
    otros: Dict[str, float]  # Opcional, para aceptar otras estadísticas

class GraficoResponse(BaseModel):
    mensaje: str  # Por ejemplo: "Gráfico generado exitosamente"
    url_grafico: str  # Si en algún momento la API devuelve un enlace
