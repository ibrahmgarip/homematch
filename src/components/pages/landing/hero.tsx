import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] max-h-[720px] flex items-center justify-center text-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 container flex flex-col items-center gap-6 text-primary-foreground px-4">
        <div className="bg-primary-foreground/10 backdrop-blur-sm p-2 rounded-full">
            <div className="bg-primary/80 text-primary-foreground px-4 py-1 rounded-full text-sm">
            Nuevas experiencias te esperan
            </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-extrabold tracking-tight">
          Encuentra tu piso ideal y haz{' '}
          <span className="text-primary-foreground drop-shadow-[0_2px_2px_rgba(252,150,68,0.8)]">
            match
          </span>{' '}
          con compañeros afines.
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-primary-foreground/80">
          Reseñas reales, perfiles verificados y experiencias que construyen confianza.
        </p>

        <div className="w-full max-w-4xl bg-background/95 dark:bg-card/80 backdrop-blur-md p-3 rounded-2xl shadow-2xl mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="¿A qué ciudad vas?" className="pl-10 h-12 text-base" />
            </div>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Fechas" className="pl-10 h-12 text-base" />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Presupuesto" className="pl-10 h-12 text-base" />
            </div>
            <Button size="lg" className="w-full h-12 text-base">Explorar pisos</Button>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <Link href="/auth/signup">
            <Button size="lg" variant="secondary" className="text-base">
              Crear mi perfil
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
