
import { properties } from '@/lib/data';
import { PropertyCard } from '@/components/property-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Map, SlidersHorizontal, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

function MapPlaceholder() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-placeholder');
  return (
    <div className="relative w-full h-[400px] lg:h-full bg-gray-200 rounded-2xl overflow-hidden shadow-inner">
      {mapImage && (
        <Image
          src={mapImage.imageUrl}
          alt={mapImage.description}
          fill
          className="object-cover"
          data-ai-hint={mapImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
        <div className="text-center p-4 bg-background/80 rounded-xl backdrop-blur-sm">
          <Map className="w-12 h-12 mx-auto text-primary" />
          <p className="mt-2 font-semibold text-foreground">Mapa interactivo</p>
          <p className="text-sm text-muted-foreground">Los pisos aparecerán aquí</p>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="container py-10">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Explorar</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Encuentra tu perfecto match.
        </p>
      </header>

      <Card className="p-4 mb-8 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto] xl:grid-cols-[2fr_1fr_1fr_auto_auto] gap-4 items-center">
          <Input placeholder="Ciudad, barrio, dirección..." className="sm:col-span-2 lg:col-span-1 xl:col-span-1" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Tipo de habitación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Habitación privada</SelectItem>
              <SelectItem value="shared">Habitación compartida</SelectItem>
              <SelectItem value="full">Piso completo</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">&lt; 400€</SelectItem>
              <SelectItem value="2">400€ - 600€</SelectItem>
              <SelectItem value="3">&gt; 600€</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="hidden xl:flex">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Más filtros
          </Button>
          <Button className="w-full sm:col-span-2 lg:col-span-3 xl:col-span-1">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:h-[calc(100vh-20rem)] lg:overflow-y-auto pr-4 -mr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
                 {properties.map((property) => (
                    <PropertyCard key={`${property.id}-clone`} property={{...property, id: `${property.id}-clone`}} />
                ))}
            </div>
        </div>
        <div className="hidden lg:block sticky top-24 h-[calc(100vh-14rem)]">
          <MapPlaceholder />
        </div>
      </div>
    </div>
  );
}
