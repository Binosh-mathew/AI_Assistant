import React from 'react';
import { Trash2, Download } from 'lucide-react';
import type { Message } from '../types';

interface ChatControlsProps {
  messages: Message[];
  onClearChat: () => void;
  onExportChat: () => void;
}

export const ChatControls: React.FC<ChatControlsProps> = ({ 
  messages, 
  onClearChat, 
  onExportChat 
}) => {
  if (messages.length === 0) return null;

  return (
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 mb-4">
      <span className="text-sm text-gray-600">
        {messages.length} message{messages.length !== 1 ? 's' : ''}
      </span>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onExportChat}
          className="p-2 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors duration-200"
          title="Export conversation"
        >
          <Download className="w-4 h-4" />
        </button>
        
        <button
          onClick={onClearChat}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          title="Clear conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
