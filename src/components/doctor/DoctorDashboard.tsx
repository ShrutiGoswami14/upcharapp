import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useClinic } from '../../context/ClinicContext';
import { Clinic } from '../../types/clinic';
import { DoctorHeader } from './DoctorHeader';
import { ClinicCard } from '../clinic/ClinicCard';
import { SectionHeader } from '../dashboard/SectionHeader';

interface DoctorDashboardProps {
  onOpenClinic: (clinic: Clinic) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  onOpenClinic,
}) => {
  const { clinics, doctor } = useClinic();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Doctor Header & Active Badges */}
      <DoctorHeader
        doctor={doctor}
        onAvatarPress={() => {
          if (clinics.length > 0) {
            onOpenClinic(clinics[0]);
          }
        }}
      />

      {/* Section Heading */}
      <SectionHeader
        title="My Clinics & OPD Schedules"
        subtitle="Manage your patient queues, slots & clinic associations"
      />

      {/* Clinic Cards List */}
      <View style={styles.clinicsList}>
        {clinics.map((clinic) => (
          <ClinicCard
            key={clinic.id}
            clinic={clinic}
            isHighlighted={clinic.isPrimary}
            onPress={() => onOpenClinic(clinic)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  clinicsList: {
    gap: 14,
  },
});
