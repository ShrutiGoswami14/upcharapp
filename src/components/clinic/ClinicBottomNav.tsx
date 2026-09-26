import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export type ClinicTabKey = 'home' | 'appointments' | 'doctors' | 'patients' | 'more';

interface ClinicBottomNavProps {
  activeTab: ClinicTabKey;
  onSelectTab: (tab: ClinicTabKey) => void;
}

export const ClinicBottomNav: React.FC<ClinicBottomNavProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs = [
    {
      key: 'home' as ClinicTabKey,
      label: 'Home',
      icon: (color: string) => <Ionicons name="grid" size={20} color={color} />,
    },
    {
      key: 'appointments' as ClinicTabKey,
      label: 'Appointments',
      icon: (color: string) => <Ionicons name="calendar-outline" size={20} color={color} />,
    },
    {
      key: 'doctors' as ClinicTabKey,
      label: 'Doctors',
      icon: (color: string) => <FontAwesome5 name="stethoscope" size={18} color={color} />,
    },
    {
      key: 'patients' as ClinicTabKey,
      label: 'Patients',
      icon: (color: string) => <Ionicons name="people-outline" size={20} color={color} />,
    },
    {
      key: 'more' as ClinicTabKey,
      label: 'More',
      icon: (color: string) => <Ionicons name="ellipsis-horizontal" size={20} color={color} />,
    },
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const color = isActive ? '#007AFF' : '#64748B';

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => onSelectTab(tab.key)}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer}>
              {tab.icon(color)}
            </View>
            <Text style={[styles.tabLabel, { color }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  iconContainer: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
