import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PhoneVerificationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  isVerified: boolean;
  onVerifiedChange: (verified: boolean) => void;
}

export const PhoneVerificationInput: React.FC<PhoneVerificationInputProps> = ({
  value,
  onChangeText,
  isVerified,
  onVerifiedChange,
}) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    if (!value || value.length < 10) {
      alert('Please enter a valid 10-digit mobile number first.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerifiedChange(true);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.labelText}>Mobile Number</Text>
        <Text style={styles.requiredAsterisk}> *</Text>
      </View>

      <View style={styles.inputRow}>
        {/* Country Code Pill */}
        <View style={styles.countryCodeBox}>
          <Text style={styles.flagEmoji}>🇮🇳</Text>
          <Text style={styles.countryCodeText}>+91</Text>
        </View>

        {/* Number Input with Inline Verify Button */}
        <View style={styles.phoneInputWrapper}>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={(text) => {
              onChangeText(text);
              if (isVerified) onVerifiedChange(false);
            }}
            placeholder="98765 43210"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            maxLength={10}
          />

          {isVerified ? (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#16A34A" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.verifyButton}
              onPress={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.verifyButtonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Helper Note */}
      <View style={styles.helperRow}>
        <Ionicons name="shield-checkmark-outline" size={14} color="#0080FF" />
        <Text style={styles.helperText}>
          Instant OTP confirmation for secure OPD records
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryCodeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  flagEmoji: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  phoneInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    paddingVertical: 0,
  },
  verifyButton: {
    backgroundColor: '#0080FF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  helperText: {
    fontSize: 11.5,
    color: '#475569',
  },
});
