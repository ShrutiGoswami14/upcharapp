import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActiveQueueSession, QueueToken } from '../../types/queue';
import { colors } from '../../theme/colors';

interface LiveQueueTrackerModalProps {
  visible: boolean;
  onClose: () => void;
  session: ActiveQueueSession;
  timeline: QueueToken[];
}

export const LiveQueueTrackerModal: React.FC<LiveQueueTrackerModalProps> = ({
  visible,
  onClose,
  session,
  timeline,
}) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    Alert.alert('Checked In!', 'Clinic staff has been notified of your arrival.');
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live Queue Tracker</Text>
          <View style={styles.livePulse}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Doctor Info Card */}
          <View style={styles.doctorCard}>
            <Image source={{ uri: session.doctorAvatarUrl }} style={styles.docAvatar} />
            <View style={styles.docInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.docName}>{session.doctorName}</Text>
                <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
              </View>
              <Text style={styles.docSpecialty}>{session.specialty}</Text>
              <Text style={styles.docLocation}>
                {session.clinicName} • {session.distanceKm} km away
              </Text>
            </View>
          </View>

          {/* Big Status Banner */}
          <View style={styles.heroStatusBox}>
            <Text style={styles.yourTokenLabel}>YOUR ASSIGNED TOKEN</Text>
            <Text style={styles.yourTokenNum}>#{session.yourTokenNumber}</Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>
                {isCheckedIn ? 'Waiting in Clinic' : session.yourTokenStatus}
              </Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>#{session.nowServingTokenNumber}</Text>
                <Text style={styles.statLabel}>Now Serving</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{session.peopleAheadCount}</Text>
                <Text style={styles.statLabel}>Ahead of You</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>~{session.estimatedWaitMinutes}m</Text>
                <Text style={styles.statLabel}>Est. Wait</Text>
              </View>
            </View>
          </View>

          {/* Check-in CTA */}
          <TouchableOpacity
            style={[styles.checkInBtn, isCheckedIn && styles.checkedInBtn]}
            onPress={handleCheckIn}
            disabled={isCheckedIn}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isCheckedIn ? 'checkmark-circle' : 'location'}
              size={18}
              color="#FFFFFF"
            />
            <Text style={styles.checkInText}>
              {isCheckedIn ? 'You Have Arrived at Clinic' : 'I Have Arrived at Clinic'}
            </Text>
          </TouchableOpacity>

          {/* Queue Timeline */}
          <Text style={styles.sectionTitle}>Queue Timeline</Text>
          <View style={styles.timelineContainer}>
            {timeline.map((token, index) => {
              const isServing = token.tokenNumber === session.nowServingTokenNumber;
              const isUser = token.isCurrentUser;

              return (
                <View key={token.tokenNumber} style={styles.timelineRow}>
                  {/* Left Column: Line & Dot */}
                  <View style={styles.lineCol}>
                    <View
                      style={[
                        styles.timelineDot,
                        isServing && styles.dotServing,
                        isUser && styles.dotUser,
                      ]}
                    >
                      {isServing ? (
                        <Ionicons name="medical" size={10} color="#FFFFFF" />
                      ) : isUser ? (
                        <Ionicons name="person" size={10} color="#FFFFFF" />
                      ) : null}
                    </View>
                    {index < timeline.length - 1 && <View style={styles.timelineLine} />}
                  </View>

                  {/* Right Column: Token Card */}
                  <View
                    style={[
                      styles.tokenCard,
                      isServing && styles.tokenCardServing,
                      isUser && styles.tokenCardUser,
                    ]}
                  >
                    <View style={styles.tokenCardHeader}>
                      <Text
                        style={[
                          styles.tokenCardNum,
                          isUser && { color: colors.primary },
                          isServing && { color: '#10B981' },
                        ]}
                      >
                        Token #{token.tokenNumber}
                      </Text>
                      <Text style={styles.tokenCardStatus}>
                        {isServing
                          ? 'In Room'
                          : isUser
                          ? 'Your Turn'
                          : 'In Queue'}
                      </Text>
                    </View>
                    <Text style={styles.patientNameText}>{token.patientName}</Text>
                    {token.estimatedTime && (
                      <Text style={styles.estTimeText}>
                        Est. Time: {token.estimatedTime}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  closeBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  livePulse: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#16A34A',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  docAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  docInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  docName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  docSpecialty: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
  docLocation: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  heroStatusBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  yourTokenLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0066FF',
    letterSpacing: 1,
    marginBottom: 4,
  },
  yourTokenNum: {
    fontSize: 48,
    fontWeight: '900',
    color: '#0080FF',
    lineHeight: 52,
  },
  statusPill: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 18,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  checkInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080FF',
    paddingVertical: 14,
    borderRadius: 24,
    gap: 8,
    marginBottom: 24,
    shadowColor: '#0080FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  checkedInBtn: {
    backgroundColor: '#10B981',
  },
  checkInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },
  timelineContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  lineCol: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotServing: {
    backgroundColor: '#10B981',
  },
  dotUser: {
    backgroundColor: '#0080FF',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  tokenCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tokenCardServing: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  tokenCardUser: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  tokenCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenCardNum: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  tokenCardStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  patientNameText: {
    fontSize: 13,
    color: '#475569',
    marginTop: 2,
  },
  estTimeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0080FF',
    marginTop: 4,
  },
});
