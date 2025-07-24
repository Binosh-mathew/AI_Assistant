export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}
