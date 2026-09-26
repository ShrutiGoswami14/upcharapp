import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ONBOARDING_STORAGE_KEY } from '../components/onboarding/OnboardingScreen';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';

export default function RoleSelectionScreen() {
  const router = useRouter();
  const { setActiveRole } = useAuth();

  const handleSelectRole = (role: UserRole) => {
    setActiveRole(role);
    router.replace('/');
  };

  const handleResetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_STORAGE_KEY);
      router.replace('/onboarding');
    } catch (e) {
      console.error(e);
      router.replace('/onboarding');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFD" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <View style={styles.logoBadge}>
            <Ionicons name="medical" size={24} color="#0B8EF3" />
          </View>
          <Text style={styles.brandText}>
            Upchar <Text style={styles.brandSub}>Health</Text>
          </Text>
        </View>

        {/* Title and Subtitle */}
        <View style={styles.headingSection}>
          <Text style={styles.title}>How will you use Upchar?</Text>
          <Text style={styles.subtitle}>
            Select your primary role to customize your health experience.
          </Text>
        </View>

        {/* Role Cards List */}
        <View style={styles.rolesList}>
          {/* Patient */}
          <TouchableOpacity
            style={styles.roleCard}
            activeOpacity={0.85}
            onPress={() => handleSelectRole('patient')}
            accessibilityRole="button"
            accessibilityLabel="I'm a Patient"
          >
            <View style={[styles.iconContainer, { backgroundColor: '#EBF5FF' }]}>
              <Ionicons name="person" size={26} color="#0B8EF3" />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleTitle}>I'm a Patient</Text>
              <Text style={styles.roleDesc}>
                Find doctors, book appointments, and access medical records
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Doctor */}
          <TouchableOpacity
            style={styles.roleCard}
            activeOpacity={0.85}
            onPress={() => handleSelectRole('doctor')}
            accessibilityRole="button"
            accessibilityLabel="I'm a Doctor"
          >
            <View style={[styles.iconContainer, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="medkit" size={26} color="#16A34A" />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleTitle}>I'm a Doctor</Text>
              <Text style={styles.roleDesc}>
                Manage your consultations, patient queue, and clinical schedule
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Clinic */}
          <TouchableOpacity
            style={styles.roleCard}
            activeOpacity={0.85}
            onPress={() => handleSelectRole('clinic')}
            accessibilityRole="button"
            accessibilityLabel="I'm a Clinic"
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FAF5FF' }]}>
              <Ionicons name="business" size={26} color="#9333EA" />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleTitle}>I'm a Clinic</Text>
              <Text style={styles.roleDesc}>
                Oversee OPD sessions, doctor shifts, staff, and daily queue
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Diagnostic & Lab */}
          <TouchableOpacity
            style={styles.roleCard}
            activeOpacity={0.85}
            onPress={() => handleSelectRole('lab')}
            accessibilityRole="button"
            accessibilityLabel="I'm a Diagnostic Lab"
          >
            <View style={[styles.iconContainer, { backgroundColor: '#F0FDFA' }]}>
              <Ionicons name="flask" size={26} color="#0D9488" />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleTitle}>I'm a Diagnostic Lab</Text>
              <Text style={styles.roleDesc}>
                Manage diagnostic orders, sample collections, and upload reports
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Secondary Option: Replay Onboarding */}
        <TouchableOpacity
          style={styles.replayButton}
          activeOpacity={0.7}
          onPress={handleResetOnboarding}
          accessibilityRole="button"
          accessibilityLabel="Replay Onboarding Tour"
        >
          <Ionicons name="refresh" size={16} color="#64748B" />
          <Text style={styles.replayText}>Replay Onboarding Tour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 32 : 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EBF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0B8EF3',
    letterSpacing: -0.5,
  },
  brandSub: {
    color: '#0F172A',
    fontWeight: '800',
  },
  headingSection: {
    width: '100%',
    marginBottom: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#64748B',
  },
  rolesList: {
    width: '100%',
    gap: 14,
    marginBottom: 32,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  roleInfo: {
    flex: 1,
    paddingRight: 8,
  },
  roleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  roleDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: '#64748B',
  },
  replayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  replayText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
});
