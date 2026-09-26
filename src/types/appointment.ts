export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'waiting'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'rescheduled';

export interface Appointment {
  id: string;
  doctorName: string;
  doctorAvatarUrl: string;
  specialty: string;
  clinicName: string;
  appointmentDate: string;
  appointmentTime: string;
  tokenNumber?: number;
  status: AppointmentStatus;
  fee: number;
  isQueueEnabled: boolean;
}
