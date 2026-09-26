import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useClinic } from '../../context/ClinicContext';
import { ClinicTopBar } from './ClinicTopBar';
import { ClinicGreetingBanner } from './ClinicGreetingBanner';
import { ClinicPatientFlowCard } from './ClinicPatientFlowCard';
import { ClinicOverviewGrid } from './ClinicOverviewGrid';
import { ClinicQuickActions } from './ClinicQuickActions';
import { ClinicActiveConsultations } from './ClinicActiveConsultations';
import { ClinicBottomNav, ClinicTabKey } from './ClinicBottomNav';

interface WaitingPatientItem {
  tokenNumber: number;
  name: string;
  type: string;
  waitMinutes: number;
  cabin: string;
}

export const ClinicDashboard: React.FC = () => {
  const { showToast, toastMessage } = useClinic();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ClinicTabKey>('home');

  // Queue and Token State matching the mockup
  const [activeTokenNumber, setActiveTokenNumber] = useState<number>(18);
  const [activePatientName, setActivePatientName] = useState<string>('Smt. Rajeshwari Sharma');
  const [activeConsultationType, setActiveConsultationType] = useState<string>('Follow-up');

  // Overview metrics matching mockup
  const [totalAppointments, setTotalAppointments] = useState<number>(42);
  const [completedVisits, setCompletedVisits] = useState<number>(27);
  const [waitingPatients, setWaitingPatients] = useState<number>(8);
  const [cancelledVisits, setCancelledVisits] = useState<number>(3);

  // Queue List State
  const [queueList, setQueueList] = useState<WaitingPatientItem[]>([
    { tokenNumber: 19, name: 'Vikramaditya Roy', type: 'General Consultation', waitMinutes: 8, cabin: 'Cabin #1' },
    { tokenNumber: 20, name: 'Ananya Deshmukh', type: 'Follow-up Review', waitMinutes: 14, cabin: 'Cabin #2' },
    { tokenNumber: 21, name: 'Sunil Gavaskar', type: 'Blood Pressure Check', waitMinutes: 20, cabin: 'Cabin #1' },
    { tokenNumber: 22, name: 'Meenakshi Iyer', type: 'Pediatric Consultation', waitMinutes: 26, cabin: 'Cabin #3' },
    { tokenNumber: 23, name: 'Devendra Joshi', type: 'ECG Screening', waitMinutes: 32, cabin: 'Cabin #2' },
    { tokenNumber: 24, name: 'Kavita Chawla', type: 'Diabetes Follow-up', waitMinutes: 38, cabin: 'Cabin #1' },
    { tokenNumber: 25, name: 'Harish Mukherjee', type: 'General OPD', waitMinutes: 44, cabin: 'Cabin #3' },
    { tokenNumber: 26, name: 'Ritika Sengupta', type: 'Skin Rash Consultation', waitMinutes: 50, cabin: 'Cabin #2' },
  ]);

  // Modals
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);

  // Add Appointment Form State
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newPatientType, setNewPatientType] = useState('Walk-in');

  // Handlers
  const handleAnnouncePatient = () => {
    showToast(`📢 Audio Announcement: Token #${activeTokenNumber} (${activePatientName}) to Cabin #1`);
  };

  const handleCallNextToken = () => {
    if (queueList.length === 0) {
      showToast('No more patients waiting in queue!');
      return;
    }

    const nextPatient = queueList[0];
    const remainingQueue = queueList.slice(1);

    // Increment completed count
    setCompletedVisits((prev) => prev + 1);
    setWaitingPatients((prev) => Math.max(0, prev - 1));

    // Update active token
    setActiveTokenNumber(nextPatient.tokenNumber);
    setActivePatientName(nextPatient.name);
    setActiveConsultationType(nextPatient.type);
    setQueueList(remainingQueue);

    showToast(`Now Consulting: Token #${nextPatient.tokenNumber} - ${nextPatient.name}`);
  };

  const handleDispenseNewToken = () => {
    const nextTokenNum = activeTokenNumber + queueList.length + 1;
    const defaultName = `Walk-in Patient #${nextTokenNum}`;
    const newEntry: WaitingPatientItem = {
      tokenNumber: nextTokenNum,
      name: defaultName,
      type: 'Walk-in OPD',
      waitMinutes: (queueList.length + 1) * 6,
      cabin: 'Cabin #1',
    };

    setQueueList([...queueList, newEntry]);
    setWaitingPatients((prev) => prev + 1);
    setTotalAppointments((prev) => prev + 1);

    showToast(`Dispensed Token #${nextTokenNum} for ${defaultName}`);
  };

  const handleCreateAppointment = () => {
    if (!newPatientName.trim()) {
      Alert.alert('Required', 'Please enter patient name.');
      return;
    }

    const tokenNum = activeTokenNumber + queueList.length + 1;
    const newEntry: WaitingPatientItem = {
      tokenNumber: tokenNum,
      name: newPatientName.trim(),
      type: newPatientType,
      waitMinutes: (queueList.length + 1) * 6,
      cabin: 'Cabin #1',
    };

    setQueueList([...queueList, newEntry]);
    setWaitingPatients((prev) => prev + 1);
    setTotalAppointments((prev) => prev + 1);

    setIsAddAppointmentModalOpen(false);
    setNewPatientName('');
    setNewPatientPhone('');
    showToast(`Booked: Token #${tokenNum} for ${newEntry.name}`);
  };

  // Render Sub-Views for Tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <View style={styles.subScreenContainer}>
            <View style={styles.subScreenHeader}>
              <Text style={styles.subScreenTitle}>Today's Appointments ({totalAppointments})</Text>
              <TouchableOpacity
                style={styles.smallPrimaryBtn}
                onPress={() => setIsAddAppointmentModalOpen(true)}
              >
                <Ionicons name="add" size={16} color="#FFFFFF" />
                <Text style={styles.smallPrimaryBtnText}>New</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.tokenStatusCard}>
              <Text style={styles.subCardSectionTitle}>Currently In Consultation</Text>
              <View style={styles.patientRow}>
                <View style={styles.tokenCircle}>
                  <Text style={styles.tokenCircleText}>#{activeTokenNumber}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.patientItemName}>{activePatientName}</Text>
                  <Text style={styles.patientItemSub}>{activeConsultationType} • Dr. Cabin #1</Text>
                </View>
                <View style={styles.activePill}>
                  <Text style={styles.activePillText}>Consulting</Text>
                </View>
              </View>
            </View>

            <Text style={[styles.subCardSectionTitle, { marginTop: 16, marginBottom: 8 }]}>
              Waiting In Clinic ({queueList.length})
            </Text>

            {queueList.map((item) => (
              <View key={item.tokenNumber} style={styles.queueItemRow}>
                <View style={styles.queueTokenBadge}>
                  <Text style={styles.queueTokenText}>#{item.tokenNumber}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.patientItemName}>{item.name}</Text>
                  <Text style={styles.patientItemSub}>{item.type} • Est. {item.waitMinutes} min wait</Text>
                </View>
                <TouchableOpacity
                  style={styles.callNowBtn}
                  onPress={() => showToast(`Calling Token #${item.tokenNumber}: ${item.name}`)}
                >
                  <Text style={styles.callNowBtnText}>Call</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );

      case 'doctors':
        return (
          <View style={styles.subScreenContainer}>
            <Text style={styles.subScreenTitle}>Doctors On Duty Today (3)</Text>
            <Text style={styles.subScreenSubtitle}>Active duty roster and cabin status</Text>

            {[
              { name: 'Dr. Amit Kumar', specialty: 'General Medicine', cabin: 'Dr. Cabin #1', status: 'Consulting', activeToken: `#${activeTokenNumber}`, color: '#007AFF' },
              { name: 'Dr. Sneha Gupta', specialty: 'Pediatrics', cabin: 'Dr. Cabin #2', status: 'Consulting', activeToken: '#20', color: '#0D9488' },
              { name: 'Dr. Rohan Sharma', specialty: 'Cardiology', cabin: 'Dr. Cabin #3', status: 'Consulting', activeToken: '#22', color: '#6366F1' },
            ].map((doc, idx) => (
              <View key={idx} style={styles.doctorCardItem}>
                <View style={[styles.doctorAvatarBox, { backgroundColor: doc.color }]}>
                  <Text style={styles.doctorAvatarInitials}>
                    {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.docItemName}>{doc.name}</Text>
                  <Text style={styles.docItemSub}>{doc.specialty} • {doc.cabin}</Text>
                  <Text style={styles.docItemToken}>Active: {doc.activeToken}</Text>
                </View>
                <View style={styles.docStatusBadge}>
                  <View style={styles.greenTinyDot} />
                  <Text style={styles.docStatusText}>{doc.status}</Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'patients':
        return (
          <View style={styles.subScreenContainer}>
            <Text style={styles.subScreenTitle}>Patient Records & Queue Lookup</Text>
            <Text style={styles.subScreenSubtitle}>Registered walk-ins & scheduled appointments</Text>

            <View style={styles.searchBarBox}>
              <Ionicons name="search" size={18} color="#64748B" />
              <TextInput
                placeholder="Search patient name, phone, or token..."
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>

            {[
              { name: activePatientName, token: activeTokenNumber, phone: '+91 98311 44556', status: 'Consulting', type: 'Follow-up' },
              ...queueList.map(q => ({ name: q.name, token: q.tokenNumber, phone: '+91 98000 12345', status: 'Waiting', type: q.type })),
            ].map((p, idx) => (
              <View key={idx} style={styles.patientRecordRow}>
                <View style={styles.patientAvatarPlaceholder}>
                  <Ionicons name="person" size={16} color="#007AFF" />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.patientItemName}>{p.name}</Text>
                  <Text style={styles.patientItemSub}>{p.phone} • {p.type}</Text>
                </View>
                <View style={[styles.statusTag, p.status === 'Consulting' ? styles.statusConsulting : styles.statusWaiting]}>
                  <Text style={[styles.statusTagText, p.status === 'Consulting' ? styles.statusConsultingText : styles.statusWaitingText]}>
                    #{p.token} {p.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'more':
        return (
          <View style={styles.subScreenContainer}>
            <Text style={styles.subScreenTitle}>Clinic Administration</Text>
            <Text style={styles.subScreenSubtitle}>ABC Clinic • Reception & Operations</Text>

            {[
              { icon: 'time-outline', title: 'OPD Session Timings', sub: 'Morning: 09:00 AM - 01:00 PM • Evening: 05:00 PM - 08:30 PM' },
              { icon: 'print-outline', title: 'Print Queue Slips', sub: 'Connect thermal receipt printer' },
              { icon: 'people-outline', title: 'Staff on Shift', sub: '3 Doctors, 2 Nurses, 1 Receptionist' },
              { icon: 'volume-high-outline', title: 'Public Address Audio', sub: 'Clinic speaker announcement settings' },
              { icon: 'settings-outline', title: 'Clinic Preferences', sub: 'Tokens, cabins, departments & notifications' },
            ].map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.adminOptionRow} activeOpacity={0.8}>
                <View style={styles.adminIconBox}>
                  <Ionicons name={item.icon as any} size={20} color="#007AFF" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.adminOptionTitle}>{item.title}</Text>
                  <Text style={styles.adminOptionSub}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        );

      default:
        // HOME: Exact Mockup Screen
        return (
          <>
            {/* Clinic Greeting Banner */}
            <ClinicGreetingBanner
              clinicName="ABC Clinic"
              isOpen={true}
              onAlertPress={() => showToast('No critical clinic alerts')}
              onClinicPress={() => showToast('ABC Clinic - General OPD')}
            />

            {/* Patient Flow Card: Live OPD Session */}
            <ClinicPatientFlowCard
              tokenNumber={activeTokenNumber}
              patientName={activePatientName}
              consultationType={activeConsultationType}
              cabinName="Dr. Cabin #1"
              specialty="General OPD"
              waitingPatientsCount={waitingPatients}
              avgWaitTimeMin={22}
              onAnnouncePatient={handleAnnouncePatient}
              onManageQueue={() => setIsQueueModalOpen(true)}
            />

            {/* Today's Overview 2x2 Grid */}
            <ClinicOverviewGrid
              totalAppointments={totalAppointments}
              completedVisits={completedVisits}
              waitingInClinic={waitingPatients}
              cancelledVisits={cancelledVisits}
              onStatPress={(key) => {
                if (key === 'appointments' || key === 'waiting') {
                  setActiveTab('appointments');
                } else {
                  showToast(`Viewing ${key} records`);
                }
              }}
            />

            {/* Quick Actions 2x2 Grid */}
            <ClinicQuickActions
              onAddAppointment={() => setIsAddAppointmentModalOpen(true)}
              onManageQueue={() => setIsQueueModalOpen(true)}
              onViewDoctors={() => setActiveTab('doctors')}
              onViewPatients={() => setActiveTab('patients')}
            />

            {/* Active Consultations Bar */}
            <ClinicActiveConsultations
              doctorsSummary="Dr. Amit, Dr. Sneha & Dr. Rohan"
              onPress={() => setActiveTab('doctors')}
            />
          </>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <Ionicons name="information-circle" size={18} color="#007AFF" />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top App Header with Upchar Health Branding */}
        <ClinicTopBar
          onNotificationPress={() => showToast('3 unread clinic notifications')}
          onProfilePress={() => setActiveTab('more')}
        />

        {/* Dynamic Screen Content */}
        {renderTabContent()}
      </ScrollView>

      {/* Fixed Bottom Navigation matching mockup */}
      <ClinicBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* =========================================================
          QUEUE MANAGEMENT MODAL (LIVE TOKEN DISPENSER)
      ========================================================= */}
      <Modal
        visible={isQueueModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsQueueModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Manage OPD Queue</Text>
                <Text style={styles.modalSubtitle}>Dr. Cabin #1 • ABC Clinic</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsQueueModalOpen(false)}
                style={styles.closeBtn}
              >
                <Ionicons name="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {/* Current Active Token Box */}
            <View style={styles.modalActiveBox}>
              <View style={styles.modalActiveTop}>
                <Text style={styles.modalActiveLabel}>NOW CONSULTING</Text>
                <TouchableOpacity onPress={handleAnnouncePatient} style={styles.modalAnnounceBtn}>
                  <MaterialCommunityIcons name="account-voice" size={18} color="#007AFF" />
                  <Text style={styles.modalAnnounceBtnText}>Announce</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalBigToken}>Token #{activeTokenNumber}</Text>
              <Text style={styles.modalPatientName}>{activePatientName}</Text>
              <Text style={styles.modalPatientSub}>{activeConsultationType} • Dr. Cabin #1</Text>
            </View>

            {/* Action Buttons Row */}
            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.callNextBtn}
                onPress={handleCallNextToken}
                activeOpacity={0.9}
              >
                <Ionicons name="checkmark-done" size={18} color="#FFFFFF" />
                <Text style={styles.callNextBtnText}>Call Next Patient</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.dispenseTokenBtn}
                onPress={handleDispenseNewToken}
                activeOpacity={0.9}
              >
                <Ionicons name="add-circle-outline" size={18} color="#007AFF" />
                <Text style={styles.dispenseTokenBtnText}>+ Dispense Token</Text>
              </TouchableOpacity>
            </View>

            {/* Queue List Preview */}
            <Text style={styles.modalQueueTitle}>
              Waiting In Queue ({queueList.length} patients)
            </Text>

            <ScrollView style={styles.modalQueueScroll} showsVerticalScrollIndicator={false}>
              {queueList.map((item, idx) => (
                <View key={item.tokenNumber} style={styles.modalQueueItem}>
                  <View style={styles.queueItemTokenBadge}>
                    <Text style={styles.queueItemTokenText}>#{item.tokenNumber}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.queueItemName}>{item.name}</Text>
                    <Text style={styles.queueItemMeta}>{item.type} • Est. {item.waitMinutes}m</Text>
                  </View>
                  <Text style={styles.queueItemOrder}>#{idx + 1} in line</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* =========================================================
          ADD APPOINTMENT MODAL (WALK-IN / PHONE CALL)
      ========================================================= */}
      <Modal
        visible={isAddAppointmentModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddAppointmentModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>+ Add Appointment</Text>
                <Text style={styles.modalSubtitle}>Walk-in registration or phone booking</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsAddAppointmentModalOpen(false)}
                style={styles.closeBtn}
              >
                <Ionicons name="close" size={22} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {/* Patient Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Patient Full Name *</Text>
              <TextInput
                placeholder="e.g. Ramesh Kumar Verma"
                placeholderTextColor="#94A3B8"
                value={newPatientName}
                onChangeText={setNewPatientName}
                style={styles.textInput}
              />
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mobile Number (Optional)</Text>
              <TextInput
                placeholder="e.g. +91 98765 43210"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                value={newPatientPhone}
                onChangeText={setNewPatientPhone}
                style={styles.textInput}
              />
            </View>

            {/* Appointment Category Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Booking Category</Text>
              <View style={styles.categoryRow}>
                {['Walk-in', 'Phone Call', 'Follow-up', 'Emergency'].map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    onPress={() => setNewPatientType(cat)}
                    style={[
                      styles.categoryChip,
                      newPatientType === cat && styles.categoryChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        newPatientType === cat && styles.categoryChipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleCreateAppointment}
              activeOpacity={0.9}
            >
              <Text style={styles.submitBtnText}>Generate Token & Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 6,
    paddingBottom: 20,
  },
  toastContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 20,
    left: 20,
    right: 20,
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },

  /* Sub-screens for tabs */
  subScreenContainer: {
    paddingVertical: 10,
  },
  subScreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  subScreenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  subScreenSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  smallPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 4,
  },
  smallPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  tokenStatusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subCardSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  patientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenCircleText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#007AFF',
  },
  patientItemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  patientItemSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  activePill: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  activePillText: {
    color: '#0D9488',
    fontSize: 11,
    fontWeight: '700',
  },
  queueItemRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  queueTokenBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  queueTokenText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  callNowBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  callNowBtnText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '700',
  },

  /* Doctors Tab */
  doctorCardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  doctorAvatarBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorAvatarInitials: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  docItemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  docItemSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  docItemToken: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 2,
  },
  docStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  greenTinyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  docStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },

  /* Patients Tab */
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
  },
  patientRecordRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  patientAvatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusConsulting: {
    backgroundColor: '#CCFBF1',
  },
  statusWaiting: {
    backgroundColor: '#FFF7ED',
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusConsultingText: {
    color: '#0D9488',
  },
  statusWaitingText: {
    color: '#EA580C',
  },

  /* More Tab */
  adminOptionRow: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adminIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminOptionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  adminOptionSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  /* Modals */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalActiveBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  modalActiveTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modalActiveLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0284C7',
    letterSpacing: 0.6,
  },
  modalAnnounceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  modalAnnounceBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#007AFF',
  },
  modalBigToken: {
    fontSize: 26,
    fontWeight: '800',
    color: '#007AFF',
  },
  modalPatientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  modalPatientSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  callNextBtn: {
    flex: 1,
    height: 46,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  callNextBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  dispenseTokenBtn: {
    flex: 1,
    height: 46,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  dispenseTokenBtnText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '700',
  },
  modalQueueTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalQueueScroll: {
    maxHeight: 220,
  },
  modalQueueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  queueItemTokenBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  queueItemTokenText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  queueItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  queueItemMeta: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  queueItemOrder: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },

  /* Add Appointment Form */
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  textInput: {
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  categoryChipActive: {
    backgroundColor: '#007AFF',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
  submitBtn: {
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
