import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OverviewStatItem {
  title: string;
  count: number | string;
  suffix: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  valueColor?: string;
}

interface ClinicOverviewGridProps {
  totalAppointments?: number;
  completedVisits?: number;
  waitingInClinic?: number;
  cancelledVisits?: number;
  onStatPress?: (statKey: string) => void;
}

export const ClinicOverviewGrid: React.FC<ClinicOverviewGridProps> = ({
  totalAppointments = 42,
  completedVisits = 27,
  waitingInClinic = 8,
  cancelledVisits = 3,
  onStatPress,
}) => {
  const stats: (OverviewStatItem & { key: string })[] = [
    {
      key: 'appointments',
      title: 'Total\nAppointments',
      count: totalAppointments,
      suffix: 'booked',
      iconName: 'calendar-outline',
      iconColor: '#007AFF',
      iconBg: '#EFF6FF',
      valueColor: '#0F172A',
    },
    {
      key: 'completed',
      title: 'Completed Visits',
      count: completedVisits,
      suffix: 'seen',
      iconName: 'checkmark-circle-outline',
      iconColor: '#0D9488',
      iconBg: '#CCFBF1',
      valueColor: '#007AFF',
    },
    {
      key: 'waiting',
      title: 'Waiting in Clinic',
      count: waitingInClinic,
      suffix: 'seated',
      iconName: 'hourglass-outline',
      iconColor: '#6366F1',
      iconBg: '#EDE9FE',
      valueColor: '#0F172A',
    },
    {
      key: 'cancelled',
      title: 'Cancelled',
      count: cancelledVisits,
      suffix: 'no-shows',
      iconName: 'close-circle-outline',
      iconColor: '#94A3B8',
      iconBg: '#F1F5F9',
      valueColor: '#0F172A',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Overview</Text>
        <Text style={styles.sectionSubtitle}>Real-time updates</Text>
      </View>

      {/* 2x2 Grid */}
      <View style={styles.grid}>
        {stats.map((item) => (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.88}
            onPress={() => onStatPress?.(item.key)}
            style={styles.card}
          >
            <View style={styles.cardTopRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={[styles.iconCircle, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.iconName} size={18} color={item.iconColor} />
              </View>
            </View>

            <View style={styles.valueRow}>
              <Text style={[styles.bigNumber, { color: item.valueColor || '#0F172A' }]}>
                {item.count}
              </Text>
              <Text style={styles.suffixText}> {item.suffix}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    minHeight: 110,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    lineHeight: 18,
    flex: 1,
    paddingRight: 6,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 10,
  },
  bigNumber: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  suffixText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
});
