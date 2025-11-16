import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { HomeMatchEvent } from '@/lib/types';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';

interface EventCardProps {
  event: HomeMatchEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group flex flex-col">
      <CardHeader className="p-0 relative h-48">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          data-ai-hint="event social"
        />
        <div className="absolute top-2 right-2">
          <Badge className="text-sm">{event.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{event.date}</span>
        </div>
        <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
          <Link href="#">{event.title}</Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center -space-x-2">
            {[...Array(3)].map((_, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={`https://picsum.photos/seed/attendee${i}/40/40`} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">+{event.attendeesCount} asistentes</span>
        </div>
        <Button size="sm">Unirse</Button>
      </CardFooter>
    </Card>
  );
}