import { User, StudentProfile, MatchResult } from '@/lib/types';
import { RoommateProfile } from '@/ai/flows/roommate-matching';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, MessageSquare, Heart, X, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProfileCardProps {
  user: User;
  profile: RoommateProfile;
  matchInfo?: MatchResult;
}

function UserRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? 'text-primary fill-primary' : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
}


export function ProfileCard({ user, profile, matchInfo }: ProfileCardProps) {
  return (
    <Card className="rounded-2xl shadow-md transition-all hover:shadow-xl">
      <CardHeader className="flex flex-row items-start gap-4 p-6">
        <Avatar className="w-24 h-24 border-4 border-background ring-2 ring-primary">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className='flex justify-between items-start'>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {user.name}, {profile.age}
              {user.isVerified && <Sparkles className="w-5 h-5 text-primary" />}
            </CardTitle>
             <UserRating rating={4.5} />
          </div>

          <CardDescription className="text-base">{profile.occupation}</CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {profile.interests.slice(0, 3).map(interest => (
              <Badge key={interest} variant="secondary">{interest}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      {matchInfo && (
        <CardContent className="px-6 pb-4">
            <div className='space-y-2'>
                <div className="flex justify-between items-baseline">
                    <p className="text-sm font-semibold text-primary">Compatibilidad</p>
                    <p className="text-2xl font-bold text-primary">{matchInfo.compatibilityScore}%</p>
                </div>
                <Progress value={matchInfo.compatibilityScore} className="h-2" />
                <p className="text-sm text-muted-foreground pt-2">{matchInfo.explanation}</p>
            </div>
        </CardContent>
      )}
      <CardFooter className="p-6 bg-secondary/30 flex gap-2">
        <Button className="flex-1 h-11 text-base">
          <MessageSquare className="mr-2 h-5 w-5" /> Chat
        </Button>
        <Button variant="outline" size="icon" className="h-11 w-11">
          <Heart className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-11 w-11">
          <X className="h-6 w-6" />
        </Button>
      </CardFooter>
    </Card>
  );
}
