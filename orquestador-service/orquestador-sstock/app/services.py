import httpx
from .config import AUTH_SERVICE_URL, DB_SERVICE_URL  # URLs de los microservicios

async def make_request(method: str, url: str, **kwargs):
    """
    Función genérica para hacer solicitudes HTTP asíncronas.
    """
    async with httpx.AsyncClient() as client:  # Context manager para asegurar el cierre adecuado del cliente
        try:
            response = await client.request(method, url, **kwargs)
            response.raise_for_status()  # Lanza una excepción si la respuesta no es exitosa
            return response.json()  # Retorna la respuesta JSON del servicio
        except httpx.HTTPStatusError as e:
            return {"error": f"Error en la solicitud HTTP: {e.response.text}"}
        except httpx.RequestError as e:
            return {"error": f"Error de solicitud: {str(e)}"}
        except Exception as e:
            return {"error": f"Error inesperado: {str(e)}"}

async def authenticate_user(email: str, password: str):
    """
    Hace una solicitud POST al servicio de autenticación para loguear al usuario.
    """
    auth_url = f"{AUTH_SERVICE_URL}/login"
    return await make_request("POST", auth_url, json={"email": email, "password": password})

async def create_user(nombre: str, email: str, password: str, role: str):
    """
    Hace una solicitud POST para crear un nuevo usuario en el servicio de autenticación.
    """
    auth_url = f"{AUTH_SERVICE_URL}/register"
    return await make_request("POST", auth_url, json={"nombre": nombre, "email": email, "password": password, "rol": role})

async def get_profile(nombre: str, email: str, password: str, role: str):
    """
    Hace una solicitud GET al servicio de autenticación para obtener el perfil del usuario.
    """
    auth_url = f"{AUTH_SERVICE_URL}/profile"
    return await make_request("POST", auth_url, json={"nombre": nombre, "email": email, "password": password, "rol": role})

async def get_db_status():
    """
    Hace una solicitud GET al servicio de base de datos para obtener el estado.
    """
    db_url = f"{DB_SERVICE_URL}/status"
    return await make_request("GET", db_url)
