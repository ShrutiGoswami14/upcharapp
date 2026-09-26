import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface QuickActionItem {
  id: string;
  label: string;
  iconName: string;
  iconType: 'fa6' | 'mci' | 'feather';
}

const actions: QuickActionItem[] = [
  { id: 'doctors', label: 'Find\nDoctor', iconName: 'stethoscope', iconType: 'fa6' },
  { id: 'clinics', label: 'Nearby\nClinics', iconName: 'hospital-building', iconType: 'mci' },
  { id: 'appointments', label: 'Appointments', iconName: 'clock', iconType: 'feather' },
  { id: 'prescriptions', label: 'Prescriptions', iconName: 'file-document-outline', iconType: 'mci' },
];

interface QuickActionsProps {
  onSelectAction?: (id: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onSelectAction }) => {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.card}
          onPress={() => onSelectAction && onSelectAction(action.id)}
          activeOpacity={0.7}
        >
          <View style={styles.iconCircle}>
            {action.iconType === 'fa6' && (
              <FontAwesome6 name={action.iconName as any} size={20} color={colors.primaryDeep} />
            )}
            {action.iconType === 'mci' && (
              <MaterialCommunityIcons name={action.iconName as any} size={22} color={colors.primaryDeep} />
            )}
            {action.iconType === 'feather' && (
              <Feather name={action.iconName as any} size={20} color={colors.primaryDeep} />
            )}
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 14,
  },
});
