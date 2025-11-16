
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { findRoommateMatches } from '@/ai/flows/roommate-matching';
import type { RoommateProfile, RoommateMatchingInput, RoommateMatchingOutput } from '@/ai/flows/roommate-matching';
import { studentProfilesForMatching, users } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { ProfileCard } from '@/components/profile-card';
import { Loader2 } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const roommateProfileSchema = z.object({
  userId: z.string().default('user-new'),
  age: z.coerce.number().min(18).max(99),
  occupation: z.string().min(3, 'La ocupación es requerida'),
  budgetMin: z.coerce.number().min(0),
  budgetMax: z.coerce.number().min(0),
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)'),
  cleanlinessPreference: z.enum(['very clean', 'clean', 'neutral', 'messy', 'very messy']),
  noisePreference: z.enum(['very quiet', 'quiet', 'neutral', 'loud', 'very loud']),
  petsPreference: z.boolean().default(false),
  smokingPreference: z.boolean().default(false),
  visitorPreference: z.enum(['frequent', 'occasional', 'rare', 'never']),
  sleepingHabits: z.enum(['early bird', 'night owl', 'flexible']),
  interests: z.string().min(3, 'Menciona al menos un interés'),
  matchVisibility: z.boolean().default(true),
}).refine(data => data.budgetMax >= data.budgetMin, {
  message: 'El presupuesto máximo debe ser mayor o igual al mínimo.',
  path: ['budgetMax'],
});

export function RoommateFinder() {
  const [matches, setMatches] = useState<RoommateMatchingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof roommateProfileSchema>>({
    resolver: zodResolver(roommateProfileSchema),
    defaultValues: studentProfilesForMatching[0], // Pre-fill with first student for demo
  });

  async function onSubmit(values: z.infer<typeof roommateProfileSchema>) {
    setIsLoading(true);
    setMatches(null);

    const userProfile: RoommateProfile = {
      ...values,
      interests: values.interests.split(',').map(i => i.trim()),
    };

    const otherProfiles = studentProfilesForMatching.filter(p => p.userId !== userProfile.userId);

    const aiInput: RoommateMatchingInput = {
      userProfile,
      otherProfiles,
    };

    try {
      const results = await findRoommateMatches(aiInput);
      setMatches(results);
    } catch (error) {
      console.error('Error finding roommate matches:', error);
      toast({
        variant: 'destructive',
        title: 'Error de la IA',
        description: 'No se pudieron encontrar matches. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const preferenceOptions = {
    cleanliness: [
      { value: 'very clean', label: 'Muy ordenado' },
      { value: 'clean', label: 'Ordenado' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'messy', label: 'Algo desordenado' },
      { value: 'very messy', label: 'Muy desordenado' },
    ],
    noise: [
      { value: 'very quiet', label: 'Muy silencioso' },
      { value: 'quiet', label: 'Silencioso' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'loud', label: 'Ruidoso' },
      { value: 'very loud', label: 'Muy ruidoso' },
    ],
    visitors: [
        { value: 'frequent', label: 'Frecuentes' },
        { value: 'occasional', label: 'Ocasionales' },
        { value: 'rare', label: 'Pocas veces' },
        { value: 'never', label: 'Nunca' },
    ],
    sleeping: [
        { value: 'early bird', label: 'Madrugador' },
        { value: 'night owl', label: 'Nocturno' },
        { value: 'flexible', label: 'Flexible' },
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card className="rounded-2xl shadow-lg lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle>Tu Perfil de Convivencia</CardTitle>
            <CardDescription>Rellena tus datos para encontrar matches.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="age" render={({ field }) => ( <FormItem><FormLabel>Edad</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="occupation" render={({ field }) => ( <FormItem><FormLabel>Ocupación</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                
                <FormField control={form.control} name="budgetMin" render={({ field }) => ( <FormItem><FormLabel>Presupuesto (€/mes)</FormLabel><FormControl><div className="flex gap-2 items-center"><Input placeholder="Min" type="number" {...field} /><span className="text-muted-foreground">-</span><Input placeholder="Max" type="number" {...form.register('budgetMax')} /></div></FormControl><FormMessage /></FormItem>)} />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="arrivalDate" render={({ field }) => ( <FormItem><FormLabel>Llegada</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="departureDate" render={({ field }) => ( <FormItem><FormLabel>Salida</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>

                <FormField control={form.control} name="cleanlinessPreference" render={({ field }) => (
                  <FormItem><FormLabel>Orden y limpieza</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>{preferenceOptions.cleanliness.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                    </Select><FormMessage />
                  </FormItem>)}
                />
                
                <FormField control={form.control} name="noisePreference" render={({ field }) => (
                  <FormItem><FormLabel>Nivel de ruido</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>{preferenceOptions.noise.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                    </Select><FormMessage />
                  </FormItem>)}
                />

                <FormField control={form.control} name="sleepingHabits" render={({ field }) => (
                  <FormItem><FormLabel>Horarios de sueño</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>{preferenceOptions.sleeping.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
                    </Select><FormMessage />
                  </FormItem>)}
                />
                
                <FormField control={form.control} name="interests" render={({ field }) => ( <FormItem><FormLabel>Intereses</FormLabel><FormControl><Textarea placeholder="Ej: senderismo, cine, cocinar..." {...field} /></FormControl><FormDescription>Separa tus intereses con comas.</FormDescription><FormMessage /></FormItem>)} />

                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="petsPreference" render={({ field }) => (<FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Acepto mascotas</FormLabel></FormItem>)} />
                    <FormField control={form.control} name="smokingPreference" render={({ field }) => (<FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><FormLabel>Acepto fumadores</FormLabel></FormItem>)} />
                </div>
                
                <Button type="submit" disabled={isLoading} className="w-full text-lg h-12">
                  {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  Encontrar Matches
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold font-headline mb-6">Tus Matches Ideales</h2>
        <div className="space-y-6">
          {isLoading && Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="flex items-center gap-4 p-4 rounded-2xl"><Skeleton className="h-24 w-24 rounded-full" /><div className="space-y-2 flex-1"><Skeleton className="h-6 w-1/3" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" /></div></Card>
          ))}
          {!isLoading && !matches && (
            <Card className="text-center p-12 rounded-2xl border-dashed">
              <h3 className="text-xl font-semibold">Tus resultados aparecerán aquí</h3>
              <p className="text-muted-foreground mt-2">Rellena el formulario y pulsa "Encontrar Matches" para empezar.</p>
            </Card>
          )}
          {!isLoading && matches && matches.length === 0 && (
            <Card className="text-center p-12 rounded-2xl border-dashed">
              <h3 className="text-xl font-semibold">No se encontraron matches</h3>
              <p className="text-muted-foreground mt-2">Intenta ajustar tus preferencias para ampliar la búsqueda.</p>
            </Card>
          )}
          {!isLoading && matches && matches.map(match => {
            const user = users.find(u => u.id === match.userId);
            const profile = studentProfilesForMatching.find(p => p.userId === match.userId);
            if (!user || !profile) return null;
            return <ProfileCard key={match.userId} user={user} profile={profile} matchInfo={match} />;
          })}
        </div>
      </div>
    </div>
  );
}
