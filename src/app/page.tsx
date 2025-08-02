import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ChatInterface from '@/components/chat/chat-interface';

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatInterface user={user} />
    </div>
  );
}
