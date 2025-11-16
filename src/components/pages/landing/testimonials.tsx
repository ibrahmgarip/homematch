import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Anna, de Alemania',
      avatarId: 'avatar2',
      text: '“Encontré mi piso y a mis mejores amigas en HomeMatch. El proceso fue súper seguro y fácil. ¡Totalmente recomendado!”',
    },
    {
      name: 'Marco, de Italia',
      avatarId: 'avatar1',
      text: '“El match de compañeros fue increíblemente acertado. Vivo con gente genial que tiene mis mismos horarios y aficiones.”',
    },
    {
      name: 'Carmen, propietaria',
      avatarId: 'avatar3',
      text: '“Alquilar a estudiantes internacionales nunca ha sido tan fácil. Los perfiles verificados me dan mucha tranquilidad.”',
    },
  ];

  const universityLogos = [
    { id: 'logo-uni1', name: 'University 1' },
    { id: 'logo-uni2', name: 'University 2' },
    { id: 'logo-uni3', name: 'University 3' },
    { id: 'logo-uni4', name: 'University 4' },
  ];

  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Una comunidad en la que puedes confiar</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Miles de estudiantes y propietarios ya usan HomeMatch.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const avatarImage = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
            return (
              <Card key={testimonial.name} className="flex flex-col justify-between p-6 rounded-2xl shadow-lg bg-card">
                <CardContent className="p-0">
                  <p className="text-lg text-card-foreground">"{testimonial.text}"</p>
                </CardContent>
                <div className="flex items-center gap-4 mt-6">
                  <Avatar>
                    {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={testimonial.name} data-ai-hint={avatarImage.imageHint} />}
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="mt-20">
          <p className="text-center text-muted-foreground font-semibold">RECOMENDADO POR UNIVERSIDADES LÍDERES</p>
          <div className="mt-8 flex justify-center items-center flex-wrap gap-x-12 gap-y-6">
            {universityLogos.map(logo => {
              const logoImage = PlaceHolderImages.find(img => img.id === logo.id);
              return logoImage ? (
                <Image key={logo.id} src={logoImage.imageUrl} alt={logo.name} width={120} height={40} className="object-contain opacity-70" data-ai-hint={logoImage.imageHint} />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
