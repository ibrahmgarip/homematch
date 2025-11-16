'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Users, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/explorar', label: 'Explorar', icon: Search },
  { href: '/perfiles', label: 'Perfiles', icon: Users },
  { href: '/mensajes', label: 'Chats', icon: MessageSquare },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-50">
      <div className="container h-full">
        <div className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
