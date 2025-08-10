'use client';

import { useRouter } from 'next/navigation';
import { UserPlus, LogIn } from 'lucide-react';
import { Button } from './ui/button';

export function AuthPrompt() {
  const router = useRouter();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/login')}
          className="hidden sm:flex"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <Button
          size="sm"
          onClick={() => router.push('/register')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Sign Up
        </Button>
      </div>
    </div>
  );
}