import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, LogIn } from 'lucide-react';

export default async function Page() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to AI Chatbot</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get started by creating an account or signing in
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90">
                <LogIn className="inline w-4 h-4 mr-2" />
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                <UserPlus className="inline w-4 h-4 mr-2" />
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler />
      </>
    );
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie.value}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler />
    </>
  );
}