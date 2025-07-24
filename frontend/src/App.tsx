import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/ask", { query });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Something went wrong. Please make sure the backend server is running on http://localhost:8000");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAsk();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">KTU AI Assistant</h1>
          <p className="text-gray-600 text-lg">Ask anything about your syllabus, notes, rules, and academic guidelines</p>
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
              Your Question
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Example: What are the requirements for CST306? What is the exam pattern for Algorithm Analysis?"
            />
            <p className="text-sm text-gray-500 mt-1">Press Ctrl+Enter to submit quickly</p>
          </div>
          
          <button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Ask AI Assistant"
            )}
          </button>
        </div>

        {/* Response Area */}
        {response && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Response:</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{response}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by RAG (Retrieval-Augmented Generation) with your academic documents</p>
        </div>
      </div>
    </div>
  );
}

export default App;
