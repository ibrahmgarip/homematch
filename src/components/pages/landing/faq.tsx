import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function Faq() {
  const faqs = [
    {
      question: '¿Cómo funciona la verificación de perfiles?',
      answer: 'Para garantizar la seguridad, pedimos a todos los usuarios que verifiquen su identidad subiendo un documento oficial (DNI, pasaporte) y, en el caso de estudiantes, una carta de aceptación de su universidad. Nuestro equipo revisa cada perfil para asegurar que la comunidad sea fiable.',
    },
    {
      question: '¿Qué pasa si tengo un problema con mi compañero de piso?',
      answer: 'Fomentamos la comunicación abierta a través de nuestro chat de piso. Si surge un problema que no podéis resolver, nuestro equipo de soporte puede mediar para encontrar una solución. Además, las reseñas bilaterales al final de la estancia ayudan a mantener un alto estándar de convivencia.',
    },
    {
      question: '¿Puedo visitar un piso antes de alquilarlo?',
      answer: '¡Por supuesto! Puedes solicitar una visita (virtual o presencial) directamente al propietario a través de nuestro chat. Recomendamos siempre ver el piso antes de tomar una decisión final.',
    },
    {
      question: '¿Cómo gestiona HomeMatch los pagos?',
      answer: 'Actualmente, HomeMatch es una plataforma para conectar a estudiantes y propietarios. Los acuerdos de pago y los contratos se realizan directamente entre ambas partes. Estamos trabajando para integrar un sistema de pagos seguro en el futuro.',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-secondary/50">
      <div className="container max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Preguntas Frecuentes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Resolvemos tus dudas para que alquiles con total tranquilidad.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}