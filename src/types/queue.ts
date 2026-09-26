export interface QueueToken {
  tokenNumber: number;
  status: 'confirmed' | 'in_room' | 'waiting' | 'completed' | 'cancelled';
  patientName: string;
  isCurrentUser?: boolean;
  estimatedTime?: string;
}

export interface ActiveQueueSession {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorAvatarUrl: string;
  specialty: string;
  clinicName: string;
  distanceKm: number;
  isVerified: boolean;
  yourTokenNumber: number;
  yourTokenStatus: 'Confirmed' | 'In room' | 'Completed';
  nowServingTokenNumber: number;
  nowServingStatus: string;
  estimatedWaitMinutes: number;
  peopleAheadCount: number;
  lastUpdated: string;
}
