from utils.http_client import client
from models.auth_models import LoginRequest, RegisterRequest

BASE_URL_AUTH = "http://localhost:3000" 

async def login(credentials: LoginRequest):
    response = await client.post(f"{BASE_URL_AUTH}/login", json=credentials.dict())
    response.raise_for_status()
    return response.json()

async def register(user: RegisterRequest):
    response = await client.post(f"{BASE_URL_AUTH}/register", json=user.dict())
    response.raise_for_status()
    return response.json()

async def refresh_token(token: str):
    headers = {"Authorization": f"Bearer {token}"}
    response = await client.get(f"{BASE_URL_AUTH}/refresh", headers=headers)
    response.raise_for_status()
    return response.json()
