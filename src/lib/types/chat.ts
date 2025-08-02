// Database model types
export type User = {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
};

export type Chat = {
  id: string;
  createdAt: Date;
  title: string;
  userId: string;
  visibility: 'public' | 'private';
};

export type DBMessage = {
  id: string;
  chatId: string;
  role: string;
  parts: Array<MessagePart>;
  attachments: Array<Attachment>;
  createdAt: Date;
};

export type Vote = {
  chatId: string;
  messageId: string;
  isUpvoted: boolean;
};

// AI SDK 5 message part types
export type MessagePart = 
  | { type: 'text'; text: string }
  | { type: 'tool-call'; toolCallId: string; toolName: string; args: any; state?: 'call' }
  | { type: 'tool-result'; toolCallId: string; result: any; state?: 'result' }
  | { type: 'data'; data: any }
  | { type: 'reasoning'; reasoning: string }
  | { type: 'sources'; sources: Array<Source> };

export type Source = {
  type: 'url' | 'document' | 'api';
  id: string;
  url?: string;
  title: string;
  snippet?: string;
};

export type Attachment = {
  name: string;
  url: string;
  contentType?: string;
  size?: number;
};

// UI component message type
export type UIMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  parts: Array<MessagePart>;
  attachments?: Array<Attachment>;
  createdAt?: Date;
  metadata?: {
    duration?: number;
    model?: string;
    totalTokens?: number;
    temperature?: number;
  };
};

// Message converter type
export type MessageConverter = {
  fromDB: (dbMessage: DBMessage) => UIMessage;
  toDB: (uiMessage: UIMessage, chatId: string) => Omit<DBMessage, 'id' | 'createdAt'>;
};