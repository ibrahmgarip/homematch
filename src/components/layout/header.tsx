import Link from 'next/link';
import { Home, Search, Users, MessageSquare, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import Image from 'next/image';
import { SidebarTrigger } from '../ui/sidebar';

export function Header() {

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className='md:hidden'>
            <SidebarTrigger />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href="/auth/login">
            <Button variant="ghost">Iniciar sesión</Button>
          </Link>
          <div className='hidden md:block'>
            <Link href="/auth/signup">
              <Button>Crear perfil</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
