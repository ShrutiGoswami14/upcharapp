import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

interface DiagnosticSample {
  id: string;
  patientName: string;
  patientDetails: string;
  testName: string;
  sampleType: string;
  doctorRef: string;
  status: 'pending' | 'collected' | 'analyzing' | 'ready';
  statusText: string;
  time: string;
}

const INITIAL_SAMPLES: DiagnosticSample[] = [
  {
    id: 'dx-1',
    patientName: 'Rahul Verma',
    patientDetails: '29 Y / Male • UHID: UPC-882910',
    testName: 'Complete Blood Count (CBC) + ESR',
    sampleType: 'Whole Blood (Purple EDTA)',
    doctorRef: 'Dr. Rajesh Sharma (City Care Clinic)',
    status: 'analyzing',
    statusText: 'Processing in Analyzer',
    time: 'Today, 10:15 AM',
  },
  {
    id: 'dx-2',
    patientName: 'Sunita Devi',
    patientDetails: '54 Y / Female • UHID: UPC-774912',
    testName: 'Thyroid Profile (T3, T4, TSH) & HbA1c',
    sampleType: 'Serum (Yellow Gel Tube)',
    doctorRef: 'Dr. Anita Desai (Apex Health)',
    status: 'ready',
    statusText: 'Verified & Report Ready',
    time: 'Today, 09:30 AM',
  },
  {
    id: 'dx-3',
    patientName: 'Amitabh Sen',
    patientDetails: '42 Y / Male • UHID: UPC-662198',
    testName: 'Lipid Profile & Liver Function Test (LFT)',
    sampleType: 'Serum (Red Top Tube)',
    doctorRef: 'Dr. Rajesh Sharma (City Care Clinic)',
    status: 'collected',
    statusText: 'Sample Collected',
    time: 'Today, 11:00 AM',
  },
  {
    id: 'dx-4',
    patientName: 'Priya Mehra',
    patientDetails: '31 Y / Female • UHID: UPC-991204',
    testName: 'Urine Routine & Microscopic Examination',
    sampleType: 'Sterile Urine Container',
    doctorRef: 'Dr. Vikram Malhotra (Metro Polyclinic)',
    status: 'pending',
    statusText: 'Awaiting Sample Drop',
    time: 'Today, 11:45 AM',
  },
];

export const LabDashboard: React.FC = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'pending' | 'analyzing' | 'ready'>('all');
  const [samples, setSamples] = useState(INITIAL_SAMPLES);

  const filteredSamples = samples.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return s.status === 'pending' || s.status === 'collected';
    return s.status === filter;
  });

  const handleAdvanceStatus = (sampleId: string) => {
    setSamples((prev) =>
      prev.map((s) => {
        if (s.id !== sampleId) return s;
        if (s.status === 'pending')
          return { ...s, status: 'collected', statusText: 'Sample Collected' };
        if (s.status === 'collected')
          return { ...s, status: 'analyzing', statusText: 'Processing in Analyzer' };
        if (s.status === 'analyzing')
          return { ...s, status: 'ready', statusText: 'Verified & Report Ready' };
        return s;
      })
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Diagnostic Hub Header */}
      <View style={styles.header}>
        <View style={styles.labInfo}>
          <Image
            source={{
              uri:
                user?.avatarUrl ||
                'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=200&q=80',
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.labName}>Apex Diagnostic & Pathology</Text>
            <View style={styles.badgeRow}>
              <View style={styles.nablBadge}>
                <Ionicons name="ribbon-outline" size={12} color="#0D9488" />
                <Text style={styles.nablText}>NABL Accredited</Text>
              </View>
              <Text style={styles.codeText}>ID: DX-NABL-77291</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.headerActionBtn}>
          <Ionicons name="barcode-outline" size={22} color="#0D9488" />
        </TouchableOpacity>
      </View>

      {/* 2. Key Daily Metrics Bar */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Text style={styles.metricVal}>18</Text>
          <Text style={styles.metricLbl}>Today</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={[styles.metricVal, { color: '#F59E0B' }]}>4</Text>
          <Text style={styles.metricLbl}>In Lab</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={[styles.metricVal, { color: '#10B981' }]}>9</Text>
          <Text style={styles.metricLbl}>Ready</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={[styles.metricVal, { color: '#0080FF' }]}>5</Text>
          <Text style={styles.metricLbl}>Pending</Text>
        </View>
      </View>

      {/* 3. Search Samples */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#64748B" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Patient UHID, Test or Vial Barcode..."
          placeholderTextColor="#94A3B8"
        />
      </View>

      {/* 4. Filter Pills */}
      <View style={styles.filterRow}>
        {(['all', 'pending', 'analyzing', 'ready'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterPill, filter === tab && styles.activeFilterPill]}
            onPress={() => setFilter(tab)}
          >
            <Text
              style={[
                styles.filterPillText,
                filter === tab && styles.activeFilterPillText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 5. Live Diagnostic Orders Queue */}
      <Text style={styles.sectionTitle}>Today's Sample & Test Queue</Text>

      <View style={styles.sampleList}>
        {filteredSamples.map((sample) => (
          <View key={sample.id} style={styles.sampleCard}>
            <View style={styles.cardTopRow}>
              <View>
                <Text style={styles.patientName}>{sample.patientName}</Text>
                <Text style={styles.patientSub}>{sample.patientDetails}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  sample.status === 'ready'
                    ? styles.statusReady
                    : sample.status === 'analyzing'
                    ? styles.statusAnalyzing
                    : styles.statusPending,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    sample.status === 'ready'
                      ? styles.textReady
                      : sample.status === 'analyzing'
                      ? styles.textAnalyzing
                      : styles.textPending,
                  ]}
                >
                  {sample.statusText}
                </Text>
              </View>
            </View>

            <View style={styles.testInfoBox}>
              <View style={styles.testRow}>
                <Ionicons name="flask-outline" size={16} color="#0D9488" />
                <Text style={styles.testName}>{sample.testName}</Text>
              </View>
              <Text style={styles.vialInfo}>Sample: {sample.sampleType}</Text>
              <Text style={styles.doctorInfo}>Prescribed by: {sample.doctorRef}</Text>
            </View>

            <View style={styles.cardActionsRow}>
              <Text style={styles.sampleTime}>
                <Ionicons name="time-outline" size={12} color="#64748B" /> {sample.time}
              </Text>
              <TouchableOpacity
                style={styles.advanceBtn}
                onPress={() => handleAdvanceStatus(sample.id)}
              >
                <Text style={styles.advanceBtnText}>
                  {sample.status === 'ready' ? 'Dispatch PDF' : 'Next Step →'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFD',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  labInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#0D9488',
  },
  labName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  nablBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  nablText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
  codeText: {
    fontSize: 11,
    color: '#64748B',
  },
  headerActionBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  metricsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricLbl: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    marginLeft: 8,
    color: '#0F172A',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  activeFilterPill: {
    backgroundColor: '#0D9488',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  activeFilterPillText: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  sampleList: {
    gap: 12,
  },
  sampleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  patientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  patientSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusReady: {
    backgroundColor: '#DCFCE7',
  },
  statusAnalyzing: {
    backgroundColor: '#FEF3C7',
  },
  statusPending: {
    backgroundColor: '#F1F5F9',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textReady: {
    color: '#16A34A',
  },
  textAnalyzing: {
    color: '#D97706',
  },
  textPending: {
    color: '#64748B',
  },
  testInfoBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    gap: 4,
    marginBottom: 10,
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  testName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  vialInfo: {
    fontSize: 11,
    color: '#475569',
  },
  doctorInfo: {
    fontSize: 11,
    color: '#64748B',
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  sampleTime: {
    fontSize: 11,
    color: '#64748B',
  },
  advanceBtn: {
    backgroundColor: '#0D9488',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  advanceBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
