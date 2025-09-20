'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { GraduationCap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  {
    href: '/',
    label: 'Fact Check',
    icon: ShieldCheck,
  },
  {
    href: '/training',
    label: 'Training Ground',
    icon: GraduationCap,
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
