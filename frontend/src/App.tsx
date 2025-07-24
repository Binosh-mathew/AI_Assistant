import { useState, useRef, useEffect } from 'react';
import { 
  Header, 
  ChatInput, 
  ChatMessage, 
  ChatControls, 
  ErrorState, 
  LoadingDots 
} from './components';
import { useChat } from './hooks';

function App() {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, loading, error, sendMessage, clearChat, exportChat } = useChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || loading) return;
    
    const message = inputValue;
    setInputValue(''); // Clear input immediately for better UX
    await sendMessage(message);
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the conversation?')) {
      clearChat();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          {/* Header */}
          <Header messageCount={messages.length} />

          {/* Chat Container */}
          <div className="flex flex-col h-[calc(100vh-300px)] max-h-[600px]">
            {/* Chat Controls */}
            <ChatControls 
              messages={messages}
              onClearChat={handleClearChat}
              onExportChat={exportChat}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-6 mb-6 px-2">
              {messages.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-4">
                    👋 Welcome! I'm here to help you with KTU academic questions.
                  </div>
                  <div className="text-gray-500 text-sm">
                    Try asking about syllabus topics, exam patterns, or academic guidelines.
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {loading && <LoadingDots />}
              
              {error && (
                <ErrorState 
                  error={error} 
                  onRetry={() => sendMessage(inputValue)}
                />
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSendMessage}
              loading={loading}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4">
            <p className="mb-2">
              🤖 Powered by RAG (Retrieval-Augmented Generation) with your academic documents
            </p>
            <p className="text-xs text-gray-400">
              Built with React, TypeScript, and Tailwind CSS • Made for KTU Students
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
