from routers import auth_router, analisis_router

def create_app() -> FastAPI:
    app = FastAPI(
        title="Orquestador SmartStock",
        description="Orquestador que coordina múltiples microservicios.",
        version="1.0.0"
    )
    
    app.include_router(auth_router.router, prefix="/auth", tags=["Auth"])
    app.include_router(analisis_router.router, prefix="/analisis", tags=["Análisis"])

    return app
