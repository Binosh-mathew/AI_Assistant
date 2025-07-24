#!/usr/bin/env python3
"""
Main entry point for the KTU AI Assistant backend server
"""

import uvicorn
from app.main import app
from app.config import settings

if __name__ == "__main__":
    print("Starting KTU AI Assistant Backend Server...")
    print(f"Server will run on http://{settings.HOST}:{settings.PORT}")
    print(f"API Documentation: http://{settings.HOST}:{settings.PORT}/docs")
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True,
        log_level="info"
    )
