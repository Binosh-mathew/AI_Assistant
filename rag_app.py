import os
from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.llms import Ollama
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA

# Load environment variables
load_dotenv()
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
MODEL_NAME = "llama3"

# Step 1: Load and chunk documents
def load_docs(folder_path="./docs"):
    all_docs = []
    for filename in os.listdir(folder_path):
        if filename.endswith(".pdf"):
            path = os.path.join(folder_path, filename)
            loader = PyPDFLoader(path)
            all_docs.extend(loader.load())
    return all_docs

def split_docs(docs, chunk_size=1000, chunk_overlap=200):
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    return splitter.split_documents(docs)

# Step 2: Embed and store in Chroma
def create_vector_store(chunks):
    embedding = OllamaEmbeddings(base_url=OLLAMA_BASE_URL, model=MODEL_NAME)
    vectordb = Chroma.from_documents(chunks, embedding=embedding, persist_directory="./chroma_db")
    vectordb.persist()
    return vectordb

# Step 3: Create QA chain
def get_qa_chain():
    embedding = OllamaEmbeddings(base_url=OLLAMA_BASE_URL, model=MODEL_NAME)
    vectordb = Chroma(persist_directory="./chroma_db", embedding_function=embedding)
    retriever = vectordb.as_retriever()
    llm = Ollama(base_url=OLLAMA_BASE_URL, model=MODEL_NAME)
    return RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

# Step 4: FastAPI app
app = FastAPI()
qa_chain = get_qa_chain()

class Question(BaseModel):
    query: str

@app.post("/ask")
async def ask_question(item: Question):
    response = qa_chain.run(item.query)
    return {"response": response}

@app.get("/")
async def root():
    return {"message": "RAG API is running!"}

# Optional: Favicon route
@app.get("/favicon.ico")
async def favicon():
    return FileResponse("static/favicon.ico")

# Step 5: Load and embed on first run
if __name__ == "__main__":
    docs = load_docs()
    if docs:
        chunks = split_docs(docs)
        create_vector_store(chunks)
