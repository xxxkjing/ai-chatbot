'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, VercelIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { type VisibilityType, VisibilitySelector } from './visibility-selector';
import type { Session } from 'next-auth';
import { UserPlus } from 'lucide-react';
import { useSession } from 'next-auth/react';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  session,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
}) {
  const router = useRouter();
  const { open } = useSidebar();
  const { data: currentSession } = useSession();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />

      {(!open || windowWidth < 768) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={() => {
                router.push('/');
                router.refresh();
              }}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
      )}

      {!isReadonly && (
        <ModelSelector
          session={session}
          selectedModelId={selectedModelId}
          className="order-1 md:order-2"
        />
      )}

      {!isReadonly && (
        <VisibilitySelector
          chatId={chatId}
          selectedVisibilityType={selectedVisibilityType}
          className="order-1 md:order-3"
        />
      )}

      {/* 注册/登录按钮 - 右上角 */}
      <div className="ml-auto flex items-center gap-2">
        {!currentSession?.user ? (
          <>
            <Button
              variant="ghost"
              className="hidden md:flex h-[34px] text-sm"
              onClick={() => router.push('/login')}
            >
              Sign In
            </Button>
            <Button
              variant="default"
              className="hidden md:flex h-[34px] text-sm bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push('/register')}
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Sign Up
            </Button>
            {/* 移动端紧凑按钮 */}
            <Button
              variant="ghost"
              className="md:hidden h-[34px] w-[34px] p-0"
              onClick={() => router.push('/register')}
            >
              <UserPlus className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            className="hidden md:flex h-[34px] text-sm"
            onClick={() => router.push('/api/auth/signout')}
          >
            Sign Out
          </Button>
        )}
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});