import { OnboardingSlideData } from '../types/onboarding';

export const ONBOARDING_SLIDES: OnboardingSlideData[] = [
  {
    id: 'doctor',
    image: require('../../assets/images/Doc.png'),
    title: 'Welcome To',
    brandTitle: 'Upchar Health',
    highlightWord: 'Upchar',
    highlightColor: '#0B8EF3',
    description: 'Manage your patients, appointments and consultations with ease.',
    accessibilityLabel: 'Doctor onboarding slide: Welcome To Upchar Health. Manage your patients, appointments and consultations with ease.',
    imagePosition: 'center',
  },
  {
    id: 'patient',
    image: require('../../assets/images/2.png'),
    title: 'Healthcare,',
    brandTitle: 'Made Simple.',
    highlightWord: 'Simple.',
    highlightColor: '#0B8EF3',
    description: 'Find doctors, book appointments and manage your health in one place.',
    accessibilityLabel: 'Patient onboarding slide: Healthcare, Made Simple. Find doctors, book appointments and manage your health in one place.',
    imagePosition: 'center',
  },
  {
    id: 'clinic',
    image: require('../../assets/images/Clinic.png'),
    title: 'Smarter Clinics.',
    highlightWord: 'Smarter',
    highlightColor: '#0B8EF3',
    description: 'Manage appointments, doctors, patients and daily clinic operations effortlessly.',
    accessibilityLabel: 'Clinic onboarding slide: Smarter Clinics. Manage appointments, doctors, patients and daily clinic operations effortlessly.',
    imagePosition: 'center',
  },
];
