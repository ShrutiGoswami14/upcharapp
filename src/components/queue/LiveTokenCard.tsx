import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ActiveQueueSession } from '../../types/queue';
import { colors } from '../../theme/colors';

interface LiveTokenCardProps {
  session: ActiveQueueSession;
  onPressTrackQueue?: () => void;
}

export const LiveTokenCard: React.FC<LiveTokenCardProps> = ({
  session,
  onPressTrackQueue,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Top Banner Row */}
      <View style={styles.topRow}>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveBadgeText}>LIVE TOKEN ACTIVE</Text>
        </View>

        <View style={styles.syncRow}>
          <Ionicons name="sync-outline" size={13} color={colors.primaryDeep} />
          <Text style={styles.syncText}>Live update</Text>
        </View>
      </View>

      {/* Doctor Info Row */}
      <View style={styles.doctorRow}>
        <Image source={{ uri: session.doctorAvatarUrl }} style={styles.doctorAvatar} />
        <View style={styles.doctorDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.doctorName}>{session.doctorName}</Text>
            {session.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color={colors.primary} style={styles.verifiedIcon} />
            )}
          </View>
          <Text style={styles.specialty}>{session.specialty}</Text>
          <View style={styles.clinicRow}>
            <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
            <Text style={styles.clinicText}>
              {session.clinicName} • {session.distanceKm} km
            </Text>
          </View>
        </View>
      </View>

      {/* 3-Column Metrics Container */}
      <View style={styles.metricsBox}>
        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>Your Token</Text>
          <Text style={styles.yourTokenValue}>#{session.yourTokenNumber}</Text>
          <Text style={styles.yourTokenStatus}>{session.yourTokenStatus}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>Now Serving</Text>
          <Text style={styles.metricValue}>#{session.nowServingTokenNumber}</Text>
          <Text style={styles.metricSubLabel}>{session.nowServingStatus}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricCol}>
          <Text style={styles.metricLabel}>Est. Wait</Text>
          <Text style={styles.metricValue}>~{session.estimatedWaitMinutes} m</Text>
          <Text style={styles.metricSubLabel}>{session.peopleAheadCount} ahead</Text>
        </View>
      </View>

      {/* Primary Action Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onPressTrackQueue}
        activeOpacity={0.85}
      >
        <Text style={styles.actionButtonText}>View Live Queue Tracker</Text>
        <Feather name="arrow-right" size={17} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#0080FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0EDFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0066FF',
  },
  liveBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0066FF',
    letterSpacing: 0.6,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  syncText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#0066FF',
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 12,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
  },
  doctorDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  verifiedIcon: {
    marginLeft: 5,
  },
  specialty: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0066FF',
    marginTop: 1,
  },
  clinicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 3,
  },
  clinicText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '400',
  },
  metricsBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F6FF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metricCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: '#DBEAFE',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  yourTokenValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0080FF',
    lineHeight: 26,
  },
  yourTokenStatus: {
    fontSize: 11,
    color: '#0080FF',
    fontWeight: '600',
    marginTop: 1,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 26,
  },
  metricSubLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  actionButton: {
    backgroundColor: '#0080FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#0080FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
