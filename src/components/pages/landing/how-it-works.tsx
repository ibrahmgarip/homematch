import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, Home, Smile } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <UserCheck className="w-10 h-10 text-primary" />,
      title: 'Crea tu perfil',
      description: 'Verifica tu identidad y dinos qué buscas en un compañero de piso. ¡La confianza es clave!',
    },
    {
      icon: <Home className="w-10 h-10 text-primary" />,
      title: 'Explora y conecta',
      description: 'Busca pisos, filtra por tus preferencias y envía solicitudes a los que más te gusten.',
    },
    {
      icon: <Smile className="w-10 h-10 text-primary" />,
      title: 'Vive la experiencia',
      description: 'Confirma tu estancia, conoce a tus nuevos compañeros y únete a eventos para sentirte como en casa.',
    },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">¿Cómo funciona?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            En solo tres pasos estarás listo para encontrar tu nuevo hogar en España.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center shadow-lg rounded-2xl">
              <CardHeader>
                <div className="mx-auto bg-accent p-4 rounded-full w-fit">
                    {step.icon}
                </div>
                <CardTitle className="mt-4">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}