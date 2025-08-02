'use client';

import { type UIMessage } from '@/lib/types/chat';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { User, Bot } from 'lucide-react';

interface MessageItemProps {
  message: UIMessage;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4" />
        </div>
      )}
      <Card
        className={cn(
          'max-w-[80%] px-4 py-2',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        {message.parts.map((part, index) => {
          if (part.type === 'text') {
            return (
              <p key={index} className="whitespace-pre-wrap">
                {part.text}
              </p>
            );
          }
          // Add more part types as needed
          return null;
        })}
      </Card>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}