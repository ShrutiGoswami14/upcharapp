import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ONBOARDING_SLIDES } from '../../data/onboardingData';
import { OnboardingSlideData } from '../../types/onboarding';
import { OnboardingSlide } from './OnboardingSlide';
import { PaginationDots } from './PaginationDots';
import { PrimaryButton } from './PrimaryButton';

interface OnboardingScreenProps {
  onComplete?: () => void;
}

export const ONBOARDING_STORAGE_KEY = 'hasSeenOnboarding';

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  // For responsive container on web / tablets, constrain to mobile viewport max
  const isLargeScreen = Platform.OS === 'web' && windowWidth > 540;
  const containerWidth = isLargeScreen ? Math.min(windowWidth * 0.9, 410) : windowWidth;
  const containerHeight = isLargeScreen ? Math.min(windowHeight * 0.94, 860) : windowHeight;

  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList<OnboardingSlideData>>(null);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / containerWidth);
      if (index >= 0 && index < ONBOARDING_SLIDES.length && index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    [containerWidth, activeIndex]
  );

  const handleDotPress = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const handleGetStarted = async () => {
    try {
      setLoading(true);
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
      if (onComplete) {
        onComplete();
      } else {
        router.replace('/role-selection');
      }
    } catch (error) {
      console.error('Error saving onboarding state:', error);
      router.replace('/role-selection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.outerBackground}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View
        style={[
          styles.screenContainer,
          {
            width: containerWidth,
            height: containerHeight,
          },
          isLargeScreen && styles.desktopFrame,
        ]}
      >
        {/* Horizontal Carousel */}
        <FlatList
          ref={flatListRef}
          data={ONBOARDING_SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          getItemLayout={(_, index) => ({
            length: containerWidth,
            offset: containerWidth * index,
            index,
          })}
          renderItem={({ item }) => (
            <OnboardingSlide
              slide={item}
              width={containerWidth}
              height={containerHeight}
            />
          )}
          style={styles.flatList}
        />

        {/* Floating Fixed Bottom Controls (Pagination + CTA) */}
        <View
          style={[
            styles.bottomControls,
            {
              paddingBottom: Math.max(insets.bottom, 20) + (isLargeScreen ? 14 : 6),
            },
          ]}
          pointerEvents="box-none"
        >
          {/* Pagination Indicators (3 Horizontal Bars) */}
          <PaginationDots
            total={ONBOARDING_SLIDES.length}
            activeIndex={activeIndex}
            onDotPress={handleDotPress}
            style={styles.pagination}
          />

          {/* Primary CTA Button */}
          <View style={styles.buttonWrapper}>
            <PrimaryButton
              title="Get Started"
              onPress={handleGetStarted}
              loading={loading}
              accessibilityLabel="Get Started with Upchar Health"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerBackground: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenContainer: {
    backgroundColor: '#000000',
    overflow: 'hidden',
    position: 'relative',
  },
  desktopFrame: {
    borderRadius: 36,
    borderWidth: 4,
    borderColor: '#2F4BA2',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.45,
    shadowRadius: 28,
    elevation: 16,
  },
  flatList: {
    flex: 1,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 20,
  },
  pagination: {
    marginBottom: 12,
  },
  buttonWrapper: {
    width: '100%',
  },
});
