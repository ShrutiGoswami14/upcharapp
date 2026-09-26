import { Doctor } from '../../types/doctor';
import { ActiveQueueSession, QueueToken } from '../../types/queue';
import { Appointment } from '../../types/appointment';
import { Prescription } from '../../types/prescription';
import { UserProfile } from '../../types/user';

export const mockCurrentUser: UserProfile = {
  id: 'user_safa_101',
  name: 'Safa',
  city: 'Indore, MP',
  role: 'patient',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
};

export const mockActiveQueue: ActiveQueueSession = {
  id: 'queue_sess_891',
  doctorId: 'doc_ahmed_1',
  doctorName: 'Dr. Ahmed Khan',
  doctorAvatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
  specialty: 'General Physician',
  clinicName: 'CityCare Clinic',
  distanceKm: 1.2,
  isVerified: true,
  yourTokenNumber: 17,
  yourTokenStatus: 'Confirmed',
  nowServingTokenNumber: 12,
  nowServingStatus: 'In room',
  estimatedWaitMinutes: 25,
  peopleAheadCount: 4,
  lastUpdated: 'Just now',
};

export const mockQueueTimeline: QueueToken[] = [
  { tokenNumber: 12, status: 'in_room', patientName: 'Patient #12' },
  { tokenNumber: 13, status: 'waiting', patientName: 'Patient #13' },
  { tokenNumber: 14, status: 'waiting', patientName: 'Patient #14' },
  { tokenNumber: 15, status: 'waiting', patientName: 'Patient #15' },
  { tokenNumber: 16, status: 'waiting', patientName: 'Patient #16' },
  { tokenNumber: 17, status: 'confirmed', patientName: 'Safa (You)', isCurrentUser: true, estimatedTime: '25 mins' },
  { tokenNumber: 18, status: 'waiting', patientName: 'Patient #18' },
];

export const mockDoctors: Doctor[] = [
  {
    id: 'doc_ahmed_1',
    name: 'Dr. Ahmed Khan',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    specialty: 'General Physician',
    qualifications: 'MBBS, MD',
    experienceYears: 10,
    clinicName: 'CityCare',
    distanceKm: 1.2,
    rating: 4.8,
    reviewCount: 520,
    consultationFee: 400,
    isVerified: true,
    isOnline: true,
    queueStatus: {
      isLive: true,
      nowServingToken: 12,
      availableToken: 18,
    },
  },
  {
    id: 'doc_priya_2',
    name: 'Dr. Priya Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-4a92c4342d76?auto=format&fit=crop&q=80&w=256',
    specialty: 'Cardiologist',
    qualifications: 'MD (Cardiology)',
    experienceYears: 14,
    clinicName: 'Apex Heart',
    distanceKm: 3.5,
    rating: 4.9,
    reviewCount: 380,
    consultationFee: 700,
    isVerified: true,
    isOnline: true,
    nextAvailableSlot: 'Available Today 4:00 PM',
  },
  {
    id: 'doc_rajesh_3',
    name: 'Dr. Rajesh Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=256',
    specialty: 'Pediatrician',
    qualifications: 'MBBS, DCH',
    experienceYears: 8,
    clinicName: 'Childrens Hope',
    distanceKm: 2.1,
    rating: 4.7,
    reviewCount: 290,
    consultationFee: 500,
    isVerified: true,
    isOnline: true,
    nextAvailableSlot: 'Available Tomorrow 10:00 AM',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt_101',
    doctorName: 'Dr. Ahmed Khan',
    doctorAvatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    specialty: 'General Physician',
    clinicName: 'CityCare Clinic',
    appointmentDate: 'Today, 25 Sep',
    appointmentTime: '11:30 AM',
    tokenNumber: 17,
    status: 'confirmed',
    fee: 400,
    isQueueEnabled: true,
  },
  {
    id: 'apt_102',
    doctorName: 'Dr. Priya Sharma',
    doctorAvatarUrl: 'https://images.unsplash.com/photo-1594824813589-4a92c4342d76?auto=format&fit=crop&q=80&w=256',
    specialty: 'Cardiologist',
    clinicName: 'Apex Heart',
    appointmentDate: '28 Sep 2026',
    appointmentTime: '04:00 PM',
    status: 'pending',
    fee: 700,
    isQueueEnabled: false,
  },
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx_501',
    doctorName: 'Dr. Ahmed Khan',
    clinicName: 'CityCare Clinic',
    date: '18 Sep 2026',
    diagnosis: 'Seasonal Viral Bronchitis & Fatigue',
    medications: [
      {
        name: 'Amoxicillin 500mg',
        dosage: '1 Capsule',
        frequency: 'Thrice daily (after meals)',
        duration: '5 days',
        instructions: 'Take with warm water. Complete full course.',
      },
      {
        name: 'Paracetamol 650mg',
        dosage: '1 Tablet',
        frequency: 'SOS (If fever > 100°F)',
        duration: '3 days',
        instructions: 'Maintain 6 hour gap between doses.',
      },
    ],
  },
];
