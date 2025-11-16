import Link from 'next/link';
import { Home, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Home className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Construido con ❤️ para estudiantes internacionales.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} HomeMatch Hub</p>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Términos</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacidad</Link>
        </div>
        <div className="flex items-center gap-2">
            <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary"/>
            </Link>
            <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary"/>
            </Link>
            <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary"/>
            </Link>
        </div>
      </div>
    </footer>
  );
}
