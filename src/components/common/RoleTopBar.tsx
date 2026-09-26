import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

export const RoleTopBar: React.FC = () => {
  const { activeRole, setActiveRole, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.roleTabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeRole === 'patient' && styles.activePatientTab,
          ]}
          onPress={() => setActiveRole('patient')}
        >
          <Ionicons
            name="person"
            size={13}
            color={activeRole === 'patient' ? '#FFFFFF' : '#475569'}
          />
          <Text
            style={[
              styles.tabText,
              activeRole === 'patient' && styles.activeTabText,
            ]}
          >
            Patient
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeRole === 'doctor' && styles.activeDoctorTab,
          ]}
          onPress={() => setActiveRole('doctor')}
        >
          <MaterialCommunityIcons
            name="stethoscope"
            size={14}
            color={activeRole === 'doctor' ? '#FFFFFF' : '#475569'}
          />
          <Text
            style={[
              styles.tabText,
              activeRole === 'doctor' && styles.activeTabText,
            ]}
          >
            Doctor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeRole === 'clinic' && styles.activeClinicTab,
          ]}
          onPress={() => setActiveRole('clinic')}
        >
          <Ionicons
            name="business"
            size={13}
            color={activeRole === 'clinic' ? '#FFFFFF' : '#475569'}
          />
          <Text
            style={[
              styles.tabText,
              activeRole === 'clinic' && styles.activeTabText,
            ]}
          >
            Clinic
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeRole === 'lab' && styles.activeLabTab,
          ]}
          onPress={() => setActiveRole('lab')}
        >
          <Ionicons
            name="flask"
            size={13}
            color={activeRole === 'lab' ? '#FFFFFF' : '#475569'}
          />
          <Text
            style={[
              styles.tabText,
              activeRole === 'lab' && styles.activeTabText,
            ]}
          >
            Lab
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.exitBtn}
        onPress={signOut}
      >
        <Ionicons name="log-out-outline" size={16} color="#DC2626" />
        <Text style={styles.exitText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    padding: 3,
    gap: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activePatientTab: {
    backgroundColor: '#0080FF',
  },
  activeDoctorTab: {
    backgroundColor: '#0284C7',
  },
  activeClinicTab: {
    backgroundColor: '#2563EB',
  },
  activeLabTab: {
    backgroundColor: '#0D9488',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  exitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  exitText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
});
