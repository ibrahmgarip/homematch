import { events } from '@/lib/data';
import { EventCard } from '@/components/event-card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="container py-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-4xl font-bold font-headline">Experiencias y Eventos</h1>
          <p className="text-lg text-muted-foreground mt-2">
            No buscamos lugares, encontramos personas.
          </p>
        </div>
        <Button size="lg">
          <PlusCircle className="mr-2 h-5 w-5" />
          Crear Evento
        </Button>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
           {events.map((event) => (
            <EventCard key={`${event.id}-clone`} event={{...event, id: `${event.id}-clone`}} />
          ))}
        </div>
      </main>
    </div>
  );
}
