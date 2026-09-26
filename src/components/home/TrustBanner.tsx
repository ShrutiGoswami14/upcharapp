import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export const TrustBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        <Ionicons name="shield-checkmark-outline" size={17} color={colors.primary} />
        <Text style={styles.trustText}>
          100% Verified Indian Medical Council Doctors
        </Text>
      </View>
      <Text style={styles.careText}>24/7{'\n'}Care</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEF5FF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 24,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    paddingRight: 10,
  },
  trustText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 16,
  },
  careText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0080FF',
    textAlign: 'right',
    lineHeight: 14,
  },
});
