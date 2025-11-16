import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/lib/types';
import { MapPin, BedDouble, Bath, Star, Ruler } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const image = PlaceHolderImages.find(img => img.id === `property${property.id.split('-')[1]}`);
  const propertyTypeMap = {
    private_room: 'Habitación privada',
    shared_room: 'Habitación compartida',
    full_apartment: 'Piso completo'
  }

  return (
    <Link href={`/piso/${property.id}`} className="group">
        <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardHeader className="p-0 relative h-48">
            <Image
            src={image?.imageUrl || property.photos[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="apartment room"
            />
            <div className="absolute top-2 right-2">
                <Badge className="text-sm">{property.pricePerMonth}€/mes</Badge>
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
            <Badge variant="secondary" className="mb-2">{propertyTypeMap[property.type]}</Badge>
            <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
            {property.title}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
                {property.neighborhood}, {property.city}
            </span>
            </div>
        </CardContent>
        <CardFooter className="p-4 bg-secondary/30 flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Ruler className="h-4 w-4" />
                    <span>{property.squareMeters}m²</span>
                </div>
            </div>
            <div className="flex items-center gap-1 font-semibold text-foreground">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span>{property.rating}</span>
            </div>
        </CardFooter>
        </Card>
    </Link>
  );
}
