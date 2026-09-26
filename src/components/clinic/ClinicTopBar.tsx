import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface ClinicTopBarProps {
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export const ClinicTopBar: React.FC<ClinicTopBarProps> = ({
  onNotificationPress,
  onProfilePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Left: Branding & Subtitle */}
      <View style={styles.brandGroup}>
        <View style={styles.logoBadge}>
          <FontAwesome5 name="plus" size={14} color="#EF4444" />
        </View>
        <View>
          <Text style={styles.brandTitle}>Upchar Health</Text>
          <Text style={styles.brandSubtitle}>Home</Text>
        </View>
      </View>

      {/* Right: Notifications & Profile */}
      <View style={styles.actionsGroup}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onNotificationPress}
          style={styles.iconBtn}
        >
          <Ionicons name="notifications-outline" size={22} color="#0F172A" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onProfilePress}
          style={styles.avatarBtn}
        >
          <Ionicons name="person" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: -0.2,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: -1,
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
});
