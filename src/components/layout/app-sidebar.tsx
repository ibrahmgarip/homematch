'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home,
  Building2,
  PartyPopper,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Search,
} from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { LanguageSwitcher } from './language-switcher';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { users } from '@/lib/data';

export function AppSidebar() {
  const pathname = usePathname();
  const loggedInUser = users[0];

  const navLinks = [
    { href: '/', label: 'Inicio', icon: <Home /> },
    { href: '/explorar', label: 'Explorar', icon: <Search /> },
    { href: '/eventos', label: 'Experiencias', icon: <PartyPopper /> },
    { href: '/perfiles', label: 'Perfiles', icon: <Users /> },
    { href: '/mensajes', label: 'Chats', icon: <MessageSquare /> },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2 group-data-[collapsible=icon]:justify-center">
            <Image
              src="https://ibb.co/0R20092S"//"https://i.ibb.co/NgLwbjD/logo.png"
              alt="HomeMatch Hub Logo"
              width={32}
              height={32}
              className="transition-all duration-300"
            />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            {navLinks.map(({ href, label, icon }) => (
              <SidebarMenuItem key={label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === href}
                  icon={icon}
                  tooltip={{ children: label }}
                >
                  <Link href={href}>{label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:gap-2">
        <div className="hidden group-data-[collapsible=icon]:block">
          <SidebarTrigger />
        </div>
        <div className="flex items-center justify-center gap-1 group-data-[collapsible=icon]:flex-col">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        
        <div className="w-full border-t border-sidebar-border pt-2 mt-2">
            <SidebarMenuButton
                size="lg"
                className='h-auto p-2 w-full justify-start'
            >
                <Avatar className='h-10 w-10'>
                    <AvatarImage src={loggedInUser.avatarUrl} alt={loggedInUser.name} />
                    <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start group-data-[collapsible=icon]:hidden'>
                    <span className='font-semibold text-sidebar-foreground'>{loggedInUser.name}</span>
                    <span className='text-xs text-sidebar-foreground/70'>Ver perfil</span>
                </div>
            </SidebarMenuButton>
        </div>

      </SidebarFooter>
    </Sidebar>
  );
}
