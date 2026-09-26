import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RegistrationHeaderProps {
  onBack: () => void;
}

export const RegistrationHeader: React.FC<RegistrationHeaderProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backButton}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={22} color="#1E293B" />
      </TouchableOpacity>

      {/* Brand & Page Title */}
      <View style={styles.brandTitleContainer}>
        {/* Medical Emblem Icon */}
        <View style={styles.emblemCircle}>
          <Ionicons name="add" size={16} color="#EF4444" style={styles.crossIcon} />
        </View>

        <View>
          <Text style={styles.brandSubheader}>UPCHAR HEALTH</Text>
          <Text style={styles.pageTitle}>Patient Registration</Text>
        </View>
      </View>

      {/* Right User Icon Badge */}
      <View style={styles.userBadge}>
        <Ionicons name="person" size={16} color="#FFFFFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 8,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  brandTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginLeft: 12,
  },
  emblemCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    borderWidth: 1.5,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossIcon: {
    fontWeight: '900',
  },
  brandSubheader: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.6,
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  userBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0080FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
});
