from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel
from .services import authenticate_user, create_user, get_profile, get_db_status

# Definir un modelo Pydantic para las peticiones con datos de usuario
class UserRequest(BaseModel):
    nombre: str
    email: str
    password: str
    role: str

class LoginRequest(BaseModel):
    email: str
    password: str

app = FastAPI()

@app.get("/")
async def read_root():
    """
    Endpoint raíz para verificar que el orquestador está activo.
    """
    return {"message": "Orquestador de APIs activo"}

@app.post("/login")
async def login(login_request: LoginRequest):
    """
    El orquestador maneja el login haciendo una solicitud
    al servicio de autenticación.
    """
    return await authenticate_user(login_request.email, login_request.password)

@app.post("/register")
async def register(user: UserRequest):
    """
    El orquestador maneja el registro de un nuevo usuario,
    delegando la solicitud al servicio de autenticación.
    """
    return await create_user(user.nombre, user.email, user.password, user.role)

@app.get("/profile")
async def profile(Authorization: str = Header(...)):
    """
    El orquestador maneja el perfil del usuario,
    haciendo una solicitud a la API de autenticación.
    """
    if not Authorization:
        raise HTTPException(status_code=400, detail="Token de autorización requerido")

    response = await get_profile(nombre=None, email=None, password=None, role=None)  # Parámetros no necesarios
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response


@app.get("/db-status")
async def db_status():
    """
    Chequea el estado de la base de datos llamando a otro microservicio.
    """
    response = await get_db_status()
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"])
    return response
