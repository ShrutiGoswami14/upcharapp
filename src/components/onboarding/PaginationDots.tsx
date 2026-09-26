import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface PaginationDotsProps {
  total: number;
  activeIndex: number;
  onDotPress?: (index: number) => void;
  style?: ViewStyle;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  total,
  activeIndex,
  onDotPress,
  style,
}) => {
  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="tablist"
      accessibilityLabel={`Slide indicator: currently on slide ${activeIndex + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => onDotPress && onDotPress(index)}
            disabled={!onDotPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Slide ${index + 1}${isActive ? ', active' : ''}`}
            style={styles.touchArea}
          >
            <View
              style={[
                styles.bar,
                isActive ? styles.barActive : styles.barInactive,
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 18,
  },
  touchArea: {
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  bar: {
    height: 3.5,
    width: 60,
    borderRadius: 2,
  },
  barActive: {
    backgroundColor: '#0B8EF3',
    height: 4,
  },
  barInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
});
