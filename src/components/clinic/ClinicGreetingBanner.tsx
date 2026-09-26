import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface ClinicGreetingBannerProps {
  clinicName?: string;
  isOpen?: boolean;
  onAlertPress?: () => void;
  onClinicPress?: () => void;
}

export const ClinicGreetingBanner: React.FC<ClinicGreetingBannerProps> = ({
  clinicName = 'ABC Clinic',
  isOpen = true,
  onAlertPress,
  onClinicPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onClinicPress}
      style={styles.card}
    >
      {/* Clinic Logo Avatar */}
      <View style={styles.clinicLogoWrapper}>
        <View style={styles.innerLogo}>
          <FontAwesome5 name="clinic-medical" size={20} color="#007AFF" />
        </View>
      </View>

      {/* Greeting and Clinic Info */}
      <View style={styles.infoCol}>
        <Text style={styles.greetingText}>Good morning 👋</Text>
        <View style={styles.titleRow}>
          <Text style={styles.clinicTitle}>{clinicName}</Text>
          <View style={styles.openPill}>
            <View style={styles.greenDot} />
            <Text style={styles.openText}>{isOpen ? 'Open' : 'Closed'}</Text>
          </View>
        </View>
      </View>

      {/* Alert / Bell Action */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onAlertPress}
        style={styles.bellBtn}
      >
        <Ionicons name="notifications-outline" size={20} color="#0F172A" />
        <View style={styles.alertDot} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 16,
  },
  clinicLogoWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  innerLogo: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
  },
  greetingText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  clinicTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  openPill: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0D9488',
    marginRight: 4,
  },
  openText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    position: 'relative',
  },
  alertDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#007AFF',
  },
});
