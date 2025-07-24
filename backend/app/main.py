"""
KTU AI Assistant Backend Application

This module contains the main FastAPI application for the KTU AI Assistant.
It provides a RESTful API for querying academic documents using RAG (Retrieval-Augmented Generation).
"""

import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from .rag_service import RAGService
from .config import settings

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="KTU AI Assistant API",
    description="A Retrieval-Augmented Generation API for Kerala Technological University academic queries",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG service
rag_service = RAGService()

class Question(BaseModel):
    """Model for incoming questions"""
    query: str

class HealthResponse(BaseModel):
    """Model for health check response"""
    status: str
    message: str

@app.post("/ask")
async def ask_question(item: Question):
    """
    Process a question using the RAG system
    
    Args:
        item: Question object containing the user's query
        
    Returns:
        JSON response with the AI-generated answer
    """
    try:
        response = await rag_service.get_answer(item.query)
        return {"response": response}
    except Exception as e:
        return {"response": f"Sorry, there was an error processing your question: {str(e)}"}

@app.get("/", response_model=HealthResponse)
async def root():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="KTU AI Assistant API is running!"
    )

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Detailed health check endpoint"""
    status = await rag_service.health_check()
    return HealthResponse(
        status="healthy" if status else "unhealthy",
        message="All services operational" if status else "Some services are down"
    )

# Optional: Favicon route
@app.get("/favicon.ico")
async def favicon():
    """Serve favicon"""
    return FileResponse("static/favicon.ico")
