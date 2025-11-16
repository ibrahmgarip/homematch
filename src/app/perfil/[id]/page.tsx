import { users, reviews, properties, events } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Building, MessageSquare, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewCard } from '@/components/review-card';
import { PropertyCard } from '@/components/property-card';
import { EventCard } from '@/components/event-card';
import { Separator } from '@/components/ui/separator';

function UserRating({ rating, reviewCount }: { rating: number, reviewCount: number }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rating) ? 'text-primary fill-primary' : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      <span className="font-bold text-foreground">{rating.toFixed(1)}</span>
      <span>({reviewCount} reseñas)</span>
    </div>
  );
}


export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    notFound();
  }

  const userReviews = reviews.filter(r => r.reviewFor.type === 'user' && r.reviewFor.id === user.id);
  const userProperties = properties.filter(p => p.landlordId === user.id);
  const userEvents = events.filter(e => e.hostedBy.id === user.id);
  
  const totalRating = userReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = userReviews.length > 0 ? totalRating / userReviews.length : 0;

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* User Info Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start">
            <Card className="shadow-xl rounded-2xl p-6">
                <div className="flex flex-col items-center text-center">
                    <Avatar className="h-32 w-32 border-4 border-background ring-4 ring-primary mb-4">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
                    <p className="text-muted-foreground">Se unió en 2023</p>
                    <div className="flex items-center gap-2 mt-2">
                        {user.isVerified && <Badge>Verificado</Badge>}
                        <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                    </div>

                    <Separator className="my-6" />

                    <div className="mb-6 text-left w-full">
                        <h3 className="font-semibold text-lg mb-2">Valoración</h3>
                        <UserRating rating={averageRating} reviewCount={userReviews.length} />
                    </div>

                    <Button size="lg" className="w-full text-lg h-12">
                        <MessageSquare className="mr-2 h-5 w-5" /> Enviar Mensaje
                    </Button>
                </div>
            </Card>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-2 space-y-12">
          {/* About Section */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Sobre {user.name.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">
                {user.role === 'landlord' 
                  ? 'Propietario comprometido con ofrecer una experiencia de alquiler excepcional a estudiantes internacionales. Con varias propiedades en la ciudad, se asegura de que cada una esté en perfectas condiciones y de que los inquilinos se sientan como en casa.' 
                  : 'Estudiante internacional explorando una nueva ciudad. Buscando un gran lugar para vivir y compañeros de piso increíbles para compartir la experiencia.'
                }
              </p>
            </CardContent>
          </Card>
          
          {/* Reviews Section */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Reseñas Recibidas ({userReviews.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {userReviews.length > 0 ? (
                userReviews.map((review) => <ReviewCard key={review.id} review={review} />)
              ) : (
                <p className="text-muted-foreground text-center py-8">Este usuario todavía no ha recibido ninguna reseña.</p>
              )}
            </CardContent>
          </Card>

          {/* Hosted Events Section */}
          {userEvents.length > 0 && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Eventos Organizados ({userEvents.length})</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Properties Section (for landlords) */}
          {user.role === 'landlord' && userProperties.length > 0 && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Propiedades de {user.name.split('_')[0]} ({userProperties.length})</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
