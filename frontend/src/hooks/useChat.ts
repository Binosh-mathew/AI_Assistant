import { useState, useCallback } from 'react';
import axios from 'axios';
import type { Message, ChatState } from '../types';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const useChat = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    loading: false,
    error: null,
  });

  const addMessage = useCallback((content: string, isUser: boolean): Message => {
    const message: Message = {
      id: generateId(),
      content,
      isUser,
      timestamp: new Date(),
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
    
    return message;
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const clearChat = useCallback(() => {
    setState({
      messages: [],
      loading: false,
      error: null,
    });
  }, []);

  const sendMessage = useCallback(async (query: string) => {
    if (!query.trim() || state.loading) return;

    // Add user message
    addMessage(query.trim(), true);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/ask', { 
        query: query.trim() 
      });
      
      // Add AI response
      addMessage(response.data.response, false);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.detail
        ? error.response.data.detail
        : 'Something went wrong. Please make sure the backend server is running on http://localhost:8000';
      
      setError(errorMessage);
      addMessage(
        '❌ **Error**: ' + errorMessage + '\n\nPlease check if the backend server is running and try again.',
        false
      );
    } finally {
      setLoading(false);
    }
  }, [state.loading, addMessage, setLoading, setError]);

  const exportChat = useCallback(() => {
    const chatData = {
      exportDate: new Date().toISOString(),
      messages: state.messages.map(msg => ({
        content: msg.content,
        isUser: msg.isUser,
        timestamp: msg.timestamp.toISOString(),
      })),
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ktu-ai-chat-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.messages]);

  return {
    ...state,
    sendMessage,
    clearChat,
    exportChat,
  };
};
