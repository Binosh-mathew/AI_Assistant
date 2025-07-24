"""
Configuration settings for the KTU AI Assistant backend
"""

import os
from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Application settings"""
    
    # Ollama configuration (running in WSL - direct IP access)
    OLLAMA_BASE_URL: str = "http://172.23.141.114:11434"
    MODEL_NAME: str = "llama3"
    
    # Paths (relative to backend directory)
    DOCS_PATH: str = "./data/docs"
    VECTOR_DB_PATH: str = "./data/vector_db"
    STATIC_PATH: str = "./static"
    
    # CORS settings
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"]
    
    # Server settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Document processing settings
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    
    class Config:
        env_file = "../.env"  # Look for .env in parent directory

settings = Settings()
