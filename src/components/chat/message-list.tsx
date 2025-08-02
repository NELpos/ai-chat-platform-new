'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { type UIMessage } from '@/lib/types/chat';
import MessageItem from './message-item';

interface MessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground mt-8">
            <p className="text-lg">Start a conversation with AI</p>
            <p className="text-sm mt-2">Type your message below to begin</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="animate-pulse">AI is thinking...</div>
              </div>
            )}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}