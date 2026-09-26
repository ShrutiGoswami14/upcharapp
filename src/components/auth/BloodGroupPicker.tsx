import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BloodGroupPickerProps {
  value?: string;
  onSelect: (group: string) => void;
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const BloodGroupPicker: React.FC<BloodGroupPickerProps> = ({
  value,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleChoose = (group: string) => {
    onSelect(group);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Blood Group (Optional)</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.selectorBox}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.leftContent}>
          <Ionicons name="water-outline" size={18} color="#DC2626" />
          <Text style={[styles.valueText, !value && styles.placeholderText]}>
            {value ? `${value} Positive/Negative` : 'Select blood group'}
          </Text>
        </View>

        <Ionicons name="chevron-down" size={18} color="#64748B" />
      </TouchableOpacity>

      {/* Modal Dropdown Selector */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Blood Group</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
              {BLOOD_GROUPS.map((grp) => (
                <TouchableOpacity
                  key={grp}
                  style={[
                    styles.groupPill,
                    value === grp && styles.activeGroupPill,
                  ]}
                  onPress={() => handleChoose(grp)}
                >
                  <Ionicons
                    name="water"
                    size={16}
                    color={value === grp ? '#FFFFFF' : '#DC2626'}
                  />
                  <Text
                    style={[
                      styles.groupPillText,
                      value === grp && styles.activeGroupPillText,
                    ]}
                  >
                    {grp}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  selectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 13.5,
    color: '#0F172A',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#94A3B8',
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  groupPill: {
    width: '22%',
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  activeGroupPill: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  groupPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  activeGroupPillText: {
    color: '#FFFFFF',
  },
});
