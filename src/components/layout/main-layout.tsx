import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { VeritasLearnLogo } from '../icons';
import SidebarNav from './sidebar-nav';
import { Separator } from '../ui/separator';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon">
        <SidebarHeader>
          <div className="flex h-12 items-center gap-2 px-2">
            <Button
              variant="ghost"
              className="group/logo-button size-12 shrink-0 rounded-full"
              asChild
            >
              <a href="/">
                <VeritasLearnLogo className="size-8 shrink-0 transition-all group-hover/logo-button:scale-110" />
                <span className="sr-only">VeritasLearn</span>
              </a>
            </Button>
            <div className="duration-200 group-data-[collapsible=icon]:hidden">
              <h2 className="font-headline text-lg font-semibold">
                VeritasLearn
              </h2>
            </div>
          </div>
          <Separator />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <SidebarTrigger className="flex md:hidden" />
          <div className="flex-1">
            {/* Header Content can go here */}
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
