"""
RAG (Retrieval-Augmented Generation) Service for KTU AI Assistant

This module handles document loading, embedding, and question answering using LangChain and Ollama.
"""

import os
import asyncio
from typing import List, Optional
from langchain_community.document_loaders import PyPDFLoader
from langchain_ollama import OllamaEmbeddings, OllamaLLM
from langchain_chroma import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain_core.documents import Document

from .config import settings

class RAGService:
    """Service class for handling RAG operations"""
    
    def __init__(self):
        self.qa_chain: Optional[RetrievalQA] = None
        self.is_initialized = False
        self._initialize_chain()
    
    def _initialize_chain(self):
        """Initialize the QA chain with Ollama and ChromaDB"""
        try:
            print("Initializing RAG service...")
            
            # Load and process documents
            docs = self._load_documents()
            if docs:
                print(f"Found {len(docs)} documents. Processing...")
                chunks = self._split_documents(docs)
                self._create_vector_store(chunks)
                print("Documents processed and embeddings created!")
            else:
                print(f"No PDF documents found in {settings.DOCS_PATH}")
            
            # Create QA chain
            embedding = OllamaEmbeddings(
                base_url=settings.OLLAMA_BASE_URL,
                model=settings.MODEL_NAME
            )
            vectordb = Chroma(
                persist_directory=settings.VECTOR_DB_PATH,
                embedding_function=embedding
            )
            retriever = vectordb.as_retriever()
            llm = OllamaLLM(
                base_url=settings.OLLAMA_BASE_URL,
                model=settings.MODEL_NAME
            )
            
            self.qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                retriever=retriever
            )
            self.is_initialized = True
            print("RAG service initialized successfully!")
            
        except Exception as e:
            print(f"Failed to initialize RAG service: {e}")
            self.qa_chain = None
            self.is_initialized = False
    
    def _load_documents(self) -> List[Document]:
        """Load PDF documents from the docs directory"""
        docs = []
        docs_path = settings.DOCS_PATH
        
        if not os.path.exists(docs_path):
            print(f"Documents directory not found: {docs_path}")
            return docs
        
        for filename in os.listdir(docs_path):
            if filename.endswith(".pdf"):
                file_path = os.path.join(docs_path, filename)
                try:
                    loader = PyPDFLoader(file_path)
                    docs.extend(loader.load())
                    print(f"Loaded: {filename}")
                except Exception as e:
                    print(f"Error loading {filename}: {e}")
        
        return docs
    
    def _split_documents(self, docs: List[Document]) -> List[Document]:
        """Split documents into chunks for better retrieval"""
        splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP
        )
        return splitter.split_documents(docs)
    
    def _create_vector_store(self, chunks: List[Document]):
        """Create and persist vector store with document embeddings"""
        try:
            embedding = OllamaEmbeddings(
                base_url=settings.OLLAMA_BASE_URL,
                model=settings.MODEL_NAME
            )
            vectordb = Chroma.from_documents(
                chunks,
                embedding=embedding,
                persist_directory=settings.VECTOR_DB_PATH
            )
            # Note: ChromaDB automatically persists when using persist_directory
            print("Vector store created and persisted successfully!")
        except Exception as e:
            print(f"Error creating vector store: {e}")
            raise
            print(f"Vector store created with {len(chunks)} chunks")
        except Exception as e:
            print(f"Error creating vector store: {e}")
            raise
    
    async def get_answer(self, query: str) -> str:
        """
        Get an answer for the given query using the RAG system
        
        Args:
            query: User's question
            
        Returns:
            AI-generated response based on the documents
        """
        if not self.is_initialized or self.qa_chain is None:
            return (
                f"Hello! I received your question: '{query}'. However, the AI service "
                "is not currently available. Please check that Ollama is running and "
                "restart the server.\n\n"
                "To set up Ollama:\n"
                "1. Download from https://ollama.com/download\n"
                "2. Install it\n"
                "3. Run: ollama pull llama3\n"
                "4. Restart this server"
            )
        
        try:
            # Run the query in a thread pool to avoid blocking
            loop = asyncio.get_event_loop()
            response = await loop.run_in_executor(
                None, self.qa_chain.run, query
            )
            return response
        except Exception as e:
            return (
                f"Sorry, there was an error processing your question: {str(e)}. "
                "Please make sure Ollama is running and try again."
            )
    
    async def health_check(self) -> bool:
        """Check if the RAG service is healthy"""
        return self.is_initialized and self.qa_chain is not None
