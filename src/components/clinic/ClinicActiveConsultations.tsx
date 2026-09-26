import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DoctorInitials {
  id: string;
  initials: string;
  bgColor: string;
}

interface ClinicActiveConsultationsProps {
  doctorsSummary?: string;
  onPress?: () => void;
}

export const ClinicActiveConsultations: React.FC<ClinicActiveConsultationsProps> = ({
  doctorsSummary = 'Dr. Amit, Dr. Sneha & Dr. Rohan',
  onPress,
}) => {
  const avatars: DoctorInitials[] = [
    { id: '1', initials: 'AK', bgColor: '#007AFF' },
    { id: '2', initials: 'SG', bgColor: '#0D9488' },
    { id: '3', initials: 'RP', bgColor: '#1E293B' },
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.leftGroup}>
        {/* Overlapping Initials Avatars */}
        <View style={styles.avatarsWrapper}>
          {avatars.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.avatarCircle,
                {
                  backgroundColor: item.bgColor,
                  left: index * 20,
                  zIndex: 10 - index,
                },
              ]}
            >
              <Text style={styles.avatarText}>{item.initials}</Text>
            </View>
          ))}
        </View>

        {/* Doctor Names & Label */}
        <View style={styles.textGroup}>
          <Text style={styles.title}>Active Consultations</Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {doctorsSummary}
          </Text>
        </View>
      </View>

      {/* Right Chevron Icon */}
      <View style={styles.chevronBtn}>
        <Ionicons name="chevron-forward" size={18} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 24,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  avatarsWrapper: {
    width: 68,
    height: 36,
    position: 'relative',
    justifyContent: 'center',
  },
  avatarCircle: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  textGroup: {
    flex: 1,
    marginLeft: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  chevronBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
