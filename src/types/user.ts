export type UserRole =
  | 'patient'
  | 'doctor'
  | 'clinic'
  | 'medical'
  | 'diagnostic'
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  city: string;
}
