import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Users, Heart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Benefits() {
  const studentImage = PlaceHolderImages.find(img => img.id === 'benefit-student');
  const landlordImage = PlaceHolderImages.find(img => img.id === 'benefit-landlord');

  const studentBenefits = [
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, text: 'Alquila con confianza gracias a perfiles verificados.' },
    { icon: <Users className="h-5 w-5 text-primary" />, text: 'Encuentra compañeros afines con nuestro matching inteligente.' },
    { icon: <Heart className="h-5 w-5 text-primary" />, text: 'Intégrate en una comunidad y participa en eventos.' },
  ];

  const landlordBenefits = [
    { icon: <ShieldCheck className="h-5 w-5 text-primary" />, text: 'Inquilinos fiables y verificados para tu tranquilidad.' },
    { icon: <Users className="h-5 w-5 text-primary" />, text: 'Reduce conflictos con perfiles de convivencia compatibles.' },
    { icon: <Heart className="h-5 w-5 text-primary" />, text: 'Construye una reputación sólida con reseñas bilaterales.' },
  ];

  return (
    <section className="py-20 sm:py-32 bg-secondary/50">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* For Students */}
        <div className="flex flex-col gap-8">
            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Para Estudiantes</h2>
                <p className="text-lg text-muted-foreground">Tu aventura en España empieza con el hogar perfecto.</p>
            </div>
            {studentImage && (
                <Card className="overflow-hidden rounded-2xl shadow-xl">
                    <Image src={studentImage.imageUrl} alt={studentImage.description} width={600} height={500} className="w-full object-cover" data-ai-hint={studentImage.imageHint} />
                </Card>
            )}
            <ul className="space-y-4">
                {studentBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                    <div className="bg-primary/20 text-primary p-2 rounded-full mt-1">{benefit.icon}</div>
                    <span className="text-lg">{benefit.text}</span>
                </li>
                ))}
            </ul>
            <Button size="lg" className="self-start">Soy estudiante</Button>
        </div>

        {/* For Landlords */}
        <div className="flex flex-col gap-8">
            <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Para Propietarios</h2>
                <p className="text-lg text-muted-foreground">Alquila tus propiedades de forma segura y sencilla.</p>
            </div>
            {landlordImage && (
                <Card className="overflow-hidden rounded-2xl shadow-xl">
                    <Image src={landlordImage.imageUrl} alt={landlordImage.description} width={600} height={500} className="w-full object-cover" data-ai-hint={landlordImage.imageHint} />
                </Card>
            )}
            <ul className="space-y-4">
                {landlordBenefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4">
                    <div className="bg-primary/20 text-primary p-2 rounded-full mt-1">{benefit.icon}</div>
                    <span className="text-lg">{benefit.text}</span>
                </li>
                ))}
            </ul>
            <Button size="lg" variant="secondary" className="self-start">Soy propietario</Button>
        </div>
      </div>
    </section>
  );
}
