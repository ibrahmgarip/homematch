import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { properties, users, reviews, events } from '@/lib/data';
import {
  Building2,
  Heart,
  MessageSquare,
  Star,
  Users,
  BarChart,
  Home,
} from 'lucide-react';
import { PropertyCard } from '@/components/property-card';
import { ReviewCard } from '@/components/review-card';
import { EventCard } from '@/components/event-card';

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

function UserRating({ rating }: { rating: number }) {
  return (
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
  );
}

export default function DashboardPage() {
  const loggedInUser = users[0];
  const userRating = 4.5;
  const recentReviews = reviews.slice(0, 2);
  const upcomingEvents = events.slice(0, 2);


  return (
    <div className="container mx-auto py-8">
      {/* Welcome Header */}
      <header className="mb-8 rounded-2xl bg-gradient-to-r from-primary/80 to-primary p-8 text-primary-foreground shadow-lg">
        <h1 className="text-4xl font-bold">¡Hola, {loggedInUser.name}!</h1>
        <p className="mt-2 text-lg text-primary-foreground/90">
          Explora tu match de convivencia y administra tus propiedades.
        </p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <StatCard
              title="Propiedades Activas"
              value={properties.length}
              icon={<Building2 className="h-5 w-5" />}
            />
            <StatCard
              title="Matches de Convivencia"
              value="12"
              icon={<Users className="h-5 w-5" />}
            />
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Tu Valoración Media
                </CardTitle>
                <div className="text-muted-foreground">
                  <Star className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold">{userRating}</p>
                  <UserRating rating={userRating} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Últimas Reseñas</CardTitle>
              <CardDescription>
                Mira lo que otros dicen sobre la comunidad.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {recentReviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
              ))}
            </CardContent>
          </Card>

            {/* Upcoming Events */}
            <Card>
                <CardHeader>
                <CardTitle>Eventos Cercanos</CardTitle>
                <CardDescription>
                    Conecta con la comunidad y haz nuevos amigos.
                </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingEvents.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
                </CardContent>
            </Card>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Featured Properties */}
          <Card>
            <CardHeader>
              <CardTitle>Propiedades Destacadas</CardTitle>
              <CardDescription>
                Echa un vistazo a estas oportunidades.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {properties.slice(0, 2).map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
