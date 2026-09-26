import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialAuthButtonsProps {
  onGooglePress: () => void;
  onOtpPress: () => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  onGooglePress,
  onOtpPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <View style={styles.dividerBadge}>
          <Text style={styles.dividerText}>Or sign in with</Text>
        </View>
        <View style={styles.dividerLine} />
      </View>

      {/* Action Buttons Row */}
      <View style={styles.buttonsRow}>
        {/* Google Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.socialButton}
          onPress={onGooglePress}
        >
          <Ionicons name="logo-google" size={18} color="#EA4335" />
          <Text style={styles.buttonLabel}>Google</Text>
        </TouchableOpacity>

        {/* Mobile OTP Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.socialButton}
          onPress={onOtpPress}
        >
          <Ionicons
            name="chatbox-ellipses-outline"
            size={18}
            color="#0080FF"
          />
          <Text style={styles.buttonLabel}>Mobile OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerBadge: {
    paddingHorizontal: 12,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  socialButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
});
