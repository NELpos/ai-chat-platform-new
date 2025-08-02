'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type Chat } from '@/lib/types/chat';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
}

export default function Sidebar({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
}: SidebarProps) {
  return (
    <div className="w-64 bg-muted/50 border-r flex flex-col">
      <div className="p-4">
        <Button onClick={onNewChat} className="w-full" variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className={cn(
                'w-full justify-start mb-1',
                currentChatId === chat.id && 'bg-muted'
              )}
              onClick={() => onSelectChat(chat.id)}
            >
              <span className="truncate">{chat.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}