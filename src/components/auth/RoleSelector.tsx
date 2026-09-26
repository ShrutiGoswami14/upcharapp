import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { UserRole } from '../../types/auth';

interface RoleSelectorProps {
  activeRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  activeRole,
  onSelectRole,
}) => {
  return (
    <View style={styles.capsuleContainer}>
      {/* Patient Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tabButton,
          activeRole === 'patient' && styles.activeTabButton,
        ]}
        onPress={() => onSelectRole('patient')}
      >
        <Ionicons
          name="person-outline"
          size={18}
          color={activeRole === 'patient' ? '#0080FF' : '#475569'}
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

      {/* Doctor Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tabButton,
          activeRole === 'doctor' && styles.activeTabButton,
        ]}
        onPress={() => onSelectRole('doctor')}
      >
        <MaterialCommunityIcons
          name="stethoscope"
          size={19}
          color={activeRole === 'doctor' ? '#0080FF' : '#475569'}
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

      {/* Clinic Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tabButton,
          activeRole === 'clinic' && styles.activeTabButton,
        ]}
        onPress={() => onSelectRole('clinic')}
      >
        <Ionicons
          name="business-outline"
          size={18}
          color={activeRole === 'clinic' ? '#0080FF' : '#475569'}
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

      {/* Lab Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.tabButton,
          activeRole === 'lab' && styles.activeTabButton,
        ]}
        onPress={() => onSelectRole('lab')}
      >
        <Ionicons
          name="flask-outline"
          size={18}
          color={activeRole === 'lab' ? '#0080FF' : '#475569'}
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
  );
};

const styles = StyleSheet.create({
  capsuleContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEF2F6',
    borderRadius: 16,
    padding: 4,
    alignItems: 'center',
    marginVertical: 14,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 8,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  activeTabText: {
    color: '#0080FF',
    fontWeight: '700',
  },
});
