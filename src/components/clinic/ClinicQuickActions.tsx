import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface ClinicQuickActionsProps {
  onAddAppointment?: () => void;
  onManageQueue?: () => void;
  onViewDoctors?: () => void;
  onViewPatients?: () => void;
}

export const ClinicQuickActions: React.FC<ClinicQuickActionsProps> = ({
  onAddAppointment,
  onManageQueue,
  onViewDoctors,
  onViewPatients,
}) => {
  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Text style={styles.sectionSubtitle}>Reception shortcuts</Text>
      </View>

      {/* 2x2 Grid of Action Cards */}
      <View style={styles.grid}>
        {/* + Add Appointment */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onAddAppointment}
          style={styles.card}
        >
          <View style={[styles.iconBox, { backgroundColor: '#007AFF' }]}>
            <Ionicons name="person-add" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.actionTitle}>+ Add Appointment</Text>
          <Text style={styles.actionSubtitle}>Walk-in or phone call</Text>
        </TouchableOpacity>

        {/* Manage Queue */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onManageQueue}
          style={styles.card}
        >
          <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="list" size={20} color="#007AFF" />
          </View>
          <Text style={styles.actionTitle}>Manage Queue</Text>
          <Text style={styles.actionSubtitle}>Live token dispenser</Text>
        </TouchableOpacity>

        {/* View Doctors */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onViewDoctors}
          style={styles.card}
        >
          <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
            <FontAwesome5 name="stethoscope" size={18} color="#007AFF" />
          </View>
          <Text style={styles.actionTitle}>View Doctors</Text>
          <Text style={styles.actionSubtitle}>3 on duty today</Text>
        </TouchableOpacity>

        {/* View Patients */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={onViewPatients}
          style={styles.card}
        >
          <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="id-card-outline" size={20} color="#007AFF" />
          </View>
          <Text style={styles.actionTitle}>View Patients</Text>
          <Text style={styles.actionSubtitle}>Lookup records & history</Text>
        </TouchableOpacity>
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
    color: '#007AFF',
    fontWeight: '600',
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
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
});
