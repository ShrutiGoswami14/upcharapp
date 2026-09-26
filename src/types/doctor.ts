export interface Doctor {
  id: string;
  name: string;
  avatarUrl: string;
  specialty: string;
  qualifications: string;
  experienceYears: number;
  clinicName: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  isVerified: boolean;
  isOnline: boolean;
  queueStatus?: {
    isLive: boolean;
    nowServingToken: number;
    availableToken: number;
  };
  nextAvailableSlot?: string; // e.g. "Available Today 4:00 PM"
}
