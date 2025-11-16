'use client';

import { Check, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('ES');

  // In a real app, this would use a routing or context-based i18n solution
  const setLanguage = (lang: string) => {
    setCurrentLang(lang);
    // Here you would typically call router.push(pathname, { locale: lang })
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Cambiar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('ES')}>
          <div className="flex items-center justify-between w-full">
            <span>Español</span>
            {currentLang === 'ES' && <Check className="h-4 w-4 ml-2" />}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('EN')}>
          <div className="flex items-center justify-between w-full">
            <span>English</span>
            {currentLang === 'EN' && <Check className="h-4 w-4 ml-2" />}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
