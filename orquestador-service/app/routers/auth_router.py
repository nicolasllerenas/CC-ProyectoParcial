from fastapi import APIRouter, HTTPException
from services import auth_service
from models.auth_models import LoginRequest, LoginResponse, RegisterRequest, RegisterResponse

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
async def login(credentials: LoginRequest):
    try:
        result = await auth_service.login(credentials)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/register", response_model=RegisterResponse)
async def register(user: RegisterRequest):
    try:
        result = await auth_service.register(user)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/refresh")
async def refresh_token(token: str):
    try:
        result = await auth_service.refresh_token(token)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
