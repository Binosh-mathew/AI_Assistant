import React from 'react';
import { User, Bot, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-4 animate-slide-up ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center shadow-lg">
            <Bot className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[80%] ${message.isUser ? 'order-first' : ''}`}>
        <div className={`rounded-2xl px-4 py-3 shadow-lg ${
          message.isUser 
            ? 'bg-brand-600 text-white ml-auto' 
            : 'bg-white text-gray-800 border border-gray-200'
        }`}>
          {message.isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-1 mt-1 text-xs text-gray-400 ${
          message.isUser ? 'justify-end' : 'justify-start'
        }`}>
          <Clock className="w-3 h-3" />
          <span>{formatTime(message.timestamp)}</span>
        </div>
      </div>
      
      {message.isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};
