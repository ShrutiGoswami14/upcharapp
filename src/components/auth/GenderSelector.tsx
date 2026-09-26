import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type GenderType = 'male' | 'female' | 'other';

interface GenderSelectorProps {
  selectedGender: GenderType;
  onSelectGender: (gender: GenderType) => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  selectedGender,
  onSelectGender,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>Gender</Text>
        <Text style={styles.requiredAsterisk}> *</Text>
      </View>

      <View style={styles.pillsRow}>
        {/* Male */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.pillButton,
            selectedGender === 'male' && styles.activePillButton,
          ]}
          onPress={() => onSelectGender('male')}
        >
          <Ionicons
            name="male"
            size={16}
            color={selectedGender === 'male' ? '#FFFFFF' : '#1E293B'}
          />
          <Text
            style={[
              styles.pillText,
              selectedGender === 'male' && styles.activePillText,
            ]}
          >
            Male
          </Text>
        </TouchableOpacity>

        {/* Female */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.pillButton,
            selectedGender === 'female' && styles.activePillButton,
          ]}
          onPress={() => onSelectGender('female')}
        >
          <Ionicons
            name="female"
            size={16}
            color={selectedGender === 'female' ? '#FFFFFF' : '#1E293B'}
          />
          <Text
            style={[
              styles.pillText,
              selectedGender === 'female' && styles.activePillText,
            ]}
          >
            Female
          </Text>
        </TouchableOpacity>

        {/* Other */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.pillButton,
            selectedGender === 'other' && styles.activePillButton,
          ]}
          onPress={() => onSelectGender('other')}
        >
          <Ionicons
            name="transgender"
            size={16}
            color={selectedGender === 'other' ? '#FFFFFF' : '#1E293B'}
          />
          <Text
            style={[
              styles.pillText,
              selectedGender === 'other' && styles.activePillText,
            ]}
          >
            Other
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  requiredAsterisk: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pillButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 44,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activePillButton: {
    backgroundColor: '#0080FF',
    borderColor: '#0080FF',
    shadowColor: '#0080FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  activePillText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
