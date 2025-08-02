'use client';

import { useState } from 'react';
import { type User } from '@supabase/supabase-js';
import { useChat } from 'ai/react';
import Sidebar from '@/components/layout/sidebar';
import ChatInput from './chat-input';
import MessageList from './message-list';
import Header from '@/components/layout/header';
import { type UIMessage, type Chat } from '@/lib/types/chat';

interface ChatInterfaceProps {
  user: User;
}

export default function ChatInterface({ user }: ChatInterfaceProps) {
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      chatId: currentChatId,
    },
  });

  // Convert AI SDK messages to our UIMessage format
  const uiMessages: UIMessage[] = messages.map(msg => ({
    id: msg.id,
    role: msg.role as 'user' | 'assistant',
    parts: [{ type: 'text', text: msg.content }],
    createdAt: msg.createdAt,
  }));

  const handleSendMessage = (content: string) => {
    const event = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
    
    handleInputChange({
      target: { value: content }
    } as React.ChangeEvent<HTMLInputElement>);
    
    setTimeout(() => {
      handleSubmit(event);
    }, 0);
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    // Clear messages by reloading the component
    window.location.reload();
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // TODO: Load messages for the selected chat
  };

  return (
    <>
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <MessageList messages={uiMessages} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </>
  );
}