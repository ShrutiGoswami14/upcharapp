import { ImageSourcePropType } from 'react-native';

export interface OnboardingSlideData {
  id: 'doctor' | 'patient' | 'clinic';
  image: ImageSourcePropType;
  title: string;
  brandTitle?: string;
  highlightWord?: string;
  highlightColor?: string;
  description: string;
  accessibilityLabel: string;
  imagePosition?: 'center' | 'top' | 'bottom';
}

export interface OnboardingScreenProps {
  onComplete?: () => void;
}
