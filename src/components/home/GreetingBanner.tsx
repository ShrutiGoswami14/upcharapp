import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface GreetingBannerProps {
  userName?: string;
  hasNotifications?: boolean;
  onPressNotifications?: () => void;
}

export const GreetingBanner: React.FC<GreetingBannerProps> = ({
  userName = 'Safa',
  hasNotifications = true,
  onPressNotifications,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.greetingRow}>
          <Text style={styles.greetingText}>Good morning, {userName}</Text>
          <Text style={styles.emoji}> 👋</Text>
        </View>
        <Text style={styles.subtitleText}>How can we help you today?</Text>
      </View>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onPressNotifications}
        activeOpacity={0.7}
      >
        <Ionicons name="notifications-outline" size={22} color={colors.primaryDeep} />
        {hasNotifications && <View style={styles.notificationDot} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  emoji: {
    fontSize: 20,
  },
  subtitleText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 3,
    fontWeight: '500',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
});
