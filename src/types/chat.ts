export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  scanId?: string;
}

export interface ChatSession {
  id: string;
  scanId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
