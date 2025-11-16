import { RoommateFinder } from '@/components/roommate-finder';

export default function ProfilesPage() {
  return (
    <div className="container py-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">Conéctate con tu comunidad desde antes de aterrizar.</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          Completa tus preferencias de convivencia y deja que nuestra IA encuentre los perfiles más compatibles para ti. ¡Hacer match nunca fue tan fácil!
        </p>
      </header>

      <main>
        <RoommateFinder />
      </main>
    </div>
  );
}
