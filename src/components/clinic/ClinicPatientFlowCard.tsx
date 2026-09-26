import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ClinicPatientFlowCardProps {
  tokenNumber?: number;
  patientName?: string;
  consultationType?: string;
  cabinName?: string;
  specialty?: string;
  waitingPatientsCount?: number;
  avgWaitTimeMin?: number;
  onAnnouncePatient?: () => void;
  onManageQueue?: () => void;
}

export const ClinicPatientFlowCard: React.FC<ClinicPatientFlowCardProps> = ({
  tokenNumber = 18,
  patientName = 'Smt. Rajeshwari Sharma',
  consultationType = 'Follow-up',
  cabinName = 'Dr. Cabin #1',
  specialty = 'General OPD',
  waitingPatientsCount = 8,
  avgWaitTimeMin = 22,
  onAnnouncePatient,
  onManageQueue,
}) => {
  return (
    <View style={styles.wrapper}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="swap-horizontal" size={20} color="#007AFF" style={styles.flowIcon} />
          <Text style={styles.sectionTitle}>Patient Flow</Text>
        </View>

        <View style={styles.liveSessionBadge}>
          <View style={styles.purpleDot} />
          <Text style={styles.liveSessionText}>Live OPD Session</Text>
        </View>
      </View>

      {/* Main Flow Card */}
      <View style={styles.card}>
        {/* Top Status & Cabin Row */}
        <View style={styles.cardTopRow}>
          <View style={styles.nowConsultingBadge}>
            <View style={styles.tealDot} />
            <Text style={styles.nowConsultingText}>Now Consulting</Text>
          </View>
          <Text style={styles.cabinText}>
            {cabinName} • {specialty}
          </Text>
        </View>

        {/* Active Token & Patient Row */}
        <View style={styles.tokenRow}>
          <View style={styles.tokenInfo}>
            <Text style={styles.activeTokenLabel}>ACTIVE TOKEN</Text>
            <Text style={styles.tokenValue}>Token #{tokenNumber}</Text>
            <Text style={styles.patientNameText} numberOfLines={1}>
              {patientName} {consultationType ? `(${consultationType})` : ''}
            </Text>
          </View>

          {/* Announce/Call Patient Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onAnnouncePatient}
            style={styles.announceBtn}
          >
            <MaterialCommunityIcons name="account-voice" size={22} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Inline Stats Sub-cards */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <View style={styles.metricIconCircle}>
              <Ionicons name="people" size={16} color="#007AFF" />
            </View>
            <View>
              <Text style={styles.metricLabel}>Waiting</Text>
              <Text style={styles.metricValue}>{waitingPatientsCount} patients</Text>
            </View>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIconCircle}>
              <Ionicons name="time" size={16} color="#007AFF" />
            </View>
            <View>
              <Text style={styles.metricLabel}>Avg Wait</Text>
              <Text style={styles.metricValue}>{avgWaitTimeMin} min</Text>
            </View>
          </View>
        </View>

        {/* CTA Button: Manage Queue */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onManageQueue}
          style={styles.manageQueueBtn}
        >
          <Text style={styles.manageQueueText}>Manage Queue</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  flowIcon: {
    marginRight: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  liveSessionBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
    marginRight: 5,
  },
  liveSessionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6366F1',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nowConsultingBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tealDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0284C7',
    marginRight: 5,
  },
  nowConsultingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
  cabinText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tokenInfo: {
    flex: 1,
    paddingRight: 10,
  },
  activeTokenLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.6,
  },
  tokenValue: {
    fontSize: 27,
    fontWeight: '800',
    color: '#007AFF',
    marginVertical: 2,
    letterSpacing: -0.5,
  },
  patientNameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  announceBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metricIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 1,
  },
  manageQueueBtn: {
    backgroundColor: '#007AFF',
    borderRadius: 14,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  manageQueueText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
