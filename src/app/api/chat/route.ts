import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { z } from 'zod';

// Define request schema
const requestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })),
  chatId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    // Check authentication
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Parse and validate request
    const json = await req.json();
    const { messages, chatId } = requestSchema.parse(json);

    // Convert messages to core messages format
    const coreMessages = convertToCoreMessages(messages);

    // Stream the response
    const result = streamText({
      model: openai('gpt-4o'),
      messages: coreMessages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    // TODO: Save messages to database

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}