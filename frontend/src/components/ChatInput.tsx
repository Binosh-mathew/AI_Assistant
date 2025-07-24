import React from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  loading,
  placeholder = "Ask me anything about your syllabus, notes, rules, and academic guidelines..."
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey || e.metaKey) {
        onSubmit();
      } else if (!e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 transition-all duration-200 focus-within:shadow-xl focus-within:border-brand-300">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full h-24 resize-none bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base leading-relaxed"
          placeholder={placeholder}
          disabled={loading}
        />
        
        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-gray-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Press Enter to send • Shift+Enter for new line</span>
          </div>
          
          <button
            onClick={onSubmit}
            disabled={loading || !value.trim()}
            className="bg-brand-600 text-white px-6 py-2.5 rounded-xl hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
