#!/bin/bash
echo "================================================"
echo "    KTU AI Assistant - WSL Backend Setup"
echo "================================================"

# Navigate to the backend directory
cd backend

# Create Python virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "[Step 1] Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "[Step 2] Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "[Step 3] Installing Python dependencies..."
pip install -r requirements.txt

# Check if Ollama is running
echo "[Step 4] Checking Ollama connection..."
if curl -s http://localhost:11434 > /dev/null; then
    echo "✅ Ollama is running"
else
    echo "❌ Ollama is not running. Please start it with: ollama serve"
    exit 1
fi

# Start the backend server
echo "[Step 5] Starting FastAPI backend server..."
echo "Backend will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
