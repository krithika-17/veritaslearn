'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { GraduationCap, ShieldCheck, Trophy, Home } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/fact-check',
    label: 'Fact Check',
    icon: ShieldCheck,
  },
  {
    href: '/training',
    label: 'Training Ground',
    icon: GraduationCap,
  },
  {
    href: '/leaderboard',
    label: 'Leaderboard',
    icon: Trophy,
  },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{
                children: item.label,
              }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
