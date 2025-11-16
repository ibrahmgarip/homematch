import type { RoommateProfile } from '@/ai/flows/roommate-matching';

export type UserRole = 'student' | 'landlord';

export type User = {
  id: string;
  role: UserRole;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
};

export type LandlordProfile = User & {
  role: 'landlord';
  bio: string;
  languages: string[];
  properties: string[]; // array of property IDs
};

export type StudentProfile = User & {
  role: 'student';
  age: number;
  university?: string;
  occupation: string;
  bio: string;
  languages: string[];
  roommateProfile: RoommateProfile;
};

export type Property = {
  id: string;
  landlordId: string;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  addressApprox: string;
  coords: { lat: number; lng: number };
  pricePerMonth: number;
  expensesIncluded: boolean;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  room_sqm?: number;
  photos: string[];
  amenities: string[];
  rules: string[];
  availability: Date[];
  rating: number;
  reviewsCount: number;
  type: 'private_room' | 'shared_room' | 'full_apartment';
};

export type Review = {
  id: string;
  author: User;
  rating: number;
  comment: string;
  date: string;
  reviewFor: {
    type: 'property' | 'user';
    id: string;
  };
};

export type HomeMatchEvent = {
  id: string;
  title: string;
  type: string;
  description: string;
date: string;
  location: string;
  coverImage: string;
  attendeesCount: number;
  hostedBy: User;
};

export type MatchResult = {
  userId: string;
  compatibilityScore: number;
  explanation: string;
};
