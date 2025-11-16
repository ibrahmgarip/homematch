import { properties, users, reviews } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  BedDouble,
  Bath,
  MapPin,
  Wifi,
  Wind,
  CheckCircle,
  Star,
  MessageSquare,
  Heart,
  Share2,
  Flag,
  CalendarDays,
  Ruler,
} from 'lucide-react';
import { ReviewCard } from '@/components/review-card';
import { EventCard } from '@/components/event-card';
import { events } from '@/lib/data';

export function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id || p.id === params.id.replace('-clone', ''));
  const landlord = users.find((u) => u.id === property?.landlordId);
  const propertyReviews = reviews.filter(r => r.reviewFor.type === 'property' && r.reviewFor.id === property?.id).slice(0, 2);
  const communityEvents = events.slice(0, 2);

  if (!property || !landlord) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Propiedad no encontrada</h1>
        <p className="text-muted-foreground">La propiedad que buscas no existe o ha sido eliminada.</p>
      </div>
    );
  }
  
  const propertyTypeMap = {
    private_room: 'Habitación privada',
    shared_room: 'Habitación compartida',
    full_apartment: 'Piso completo'
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Carousel */}
          <Card className="overflow-hidden rounded-2xl shadow-lg">
            <Carousel className="w-full">
              <CarouselContent>
                {property.photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96">
                      <Image src={photo} alt={`${property.title} - Foto ${index + 1}`} fill className="object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-16" />
              <CarouselNext className="mr-16" />
            </Carousel>
          </Card>

          {/* Property Header */}
          <div>
            <Badge variant="secondary">{propertyTypeMap[property.type]}</Badge>
            <h1 className="text-4xl font-bold font-headline mt-2">{property.title}</h1>
            <div className="flex items-center text-muted-foreground mt-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{property.neighborhood}, {property.city}</span>
            </div>
          </div>
          
          <Separator />
          
          {/* Property Details */}
          <div className="flex items-center gap-8 text-lg">
            <div className="flex items-center gap-2"><BedDouble className="h-6 w-6 text-primary" /> {property.bedrooms} habs</div>
            <div className="flex items-center gap-2"><Bath className="h-6 w-6 text-primary" /> {property.bathrooms} baños</div>
            <div className="flex items-center gap-2"><Ruler className="h-6 w-6 text-primary" /> {property.squareMeters}m² (piso)</div>
            {property.expensesIncluded && <div className="flex items-center gap-2"><CheckCircle className="h-6 w-6 text-green-500" /> Gastos incluidos</div>}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Sobre este lugar</h2>
            <p className="text-muted-foreground text-lg">{property.description}</p>
          </div>
          
          <Separator />

          {/* Amenities & Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4">Servicios</h2>
              <ul className="space-y-2">
                {property.amenities.map(item => <li key={item} className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> {item}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4">Normas de la casa</h2>
              <ul className="space-y-2">
                {property.rules.map(item => <li key={item} className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> {item}</li>)}
              </ul>
            </div>
          </div>

          <Separator />
          
          {/* Reviews */}
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center gap-2">
              <Star className="h-6 w-6 text-primary fill-primary" />
              {property.rating} ({property.reviewsCount} reseñas)
            </h2>
            <div className="space-y-6">
              {propertyReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>

          <Separator />

          {/* Events */}
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Eventos de la comunidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityEvents.map(event => (
                  <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 self-start">
          <Card className="p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-2xl font-bold">{property.pricePerMonth}€ <span className="text-base font-normal text-muted-foreground">/ mes</span></p>
                    <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 mr-1 text-primary fill-primary" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-sm text-muted-foreground ml-1">({property.reviewsCount} reseñas)</span>
                    </div>
                </div>
                <Card className="p-2 rounded-lg"><CalendarDays/></Card>
            </div>
            
            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="font-semibold">Propietario</h3>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={landlord.avatarUrl} />
                  <AvatarFallback>{landlord.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/perfil/${landlord.id}`} className="hover:underline">
                    <p className="font-bold text-lg">{landlord.name}</p>
                  </Link>
                  <p className="text-muted-foreground">Se unió en 2023</p>
                  {landlord.isVerified && <Badge className="mt-1">Verificado</Badge>}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <Button size="lg" className="w-full text-base h-12">Enviar solicitud</Button>
              <Button size="lg" variant="secondary" className="w-full text-base h-12"><MessageSquare className="mr-2 h-5 w-5"/> Enviar mensaje</Button>
            </div>

            <div className="flex justify-between mt-6">
                <Button variant="ghost" className="text-muted-foreground"><Heart className="mr-2 h-4 w-4"/> Guardar</Button>
                <Button variant="ghost" className="text-muted-foreground"><Share2 className="mr-2 h-4 w-4"/> Compartir</Button>
                <Button variant="ghost" className="text-muted-foreground"><Flag className="mr-2 h-4 w-4"/> Reportar</Button>
            </div>

          </Card>
        </div>
      </div>
    </div>
  );
}
