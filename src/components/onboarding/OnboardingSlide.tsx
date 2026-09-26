import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { OnboardingSlideData } from '../../types/onboarding';

interface OnboardingSlideProps {
  slide: OnboardingSlideData;
  width: number;
  height: number;
}

export const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  slide,
  width,
  height,
}) => {
  const renderTitle = () => {
    if (slide.id === 'doctor') {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.titlePrimary}>{slide.title}</Text>
          <Text style={styles.titleBrandRow}>
            <Text style={styles.brandUpchar}>Upchar </Text>
            <Text style={styles.brandHealth}>Health</Text>
          </Text>
        </View>
      );
    }

    if (slide.id === 'patient') {
      return (
        <View style={styles.titleContainer}>
          <Text style={styles.titlePrimary}>{slide.title}</Text>
          <Text style={styles.titleBrandRow}>
            <Text style={styles.brandHealth}>Made </Text>
            <Text style={styles.brandUpchar}>Simple.</Text>
          </Text>
        </View>
      );
    }

    // Clinic slide
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.titleBrandRow}>
          <Text style={styles.brandUpchar}>Smarter </Text>
          <Text style={styles.brandHealth}>Clinics.</Text>
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[styles.slide, { width, height }]}
      accessibilityLabel={slide.accessibilityLabel}
      accessible={true}
    >
      {/* Full-screen Hero Background Image */}
      <Image
        source={slide.image}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Gradient Overlay for Crisp Text Readability */}
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0.0)',
          'rgba(0, 0, 0, 0.05)',
          'rgba(0, 0, 0, 0.35)',
          'rgba(15, 23, 42, 0.72)',
          'rgba(15, 23, 42, 0.90)',
        ]}
        locations={[0, 0.45, 0.65, 0.85, 1.0]}
        style={styles.gradientOverlay}
      />

      {/* Bottom Content Area */}
      <View style={styles.contentContainer}>
        {renderTitle()}

        {slide.description ? (
          <Text style={styles.description}>{slide.description}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 28,
    paddingBottom: 110, // Space for pagination bars and CTA button
    zIndex: 10,
  },
  titleContainer: {
    marginBottom: 10,
  },
  titlePrimary: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
    lineHeight: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
    }),
  },
  titleBrandRow: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.6,
    lineHeight: 44,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
    }),
  },
  brandUpchar: {
    color: '#0B8EF3',
    fontWeight: '900',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  brandHealth: {
    color: '#FFFFFF',
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.45)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.92)',
    fontWeight: '500',
    marginTop: 4,
    maxWidth: '92%',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
