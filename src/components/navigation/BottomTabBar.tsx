import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

export type TabType = 'home' | 'appointments' | 'prescriptions' | 'profile';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('home')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'home' && styles.activeIconWrapper]}>
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={20}
            color={activeTab === 'home' ? colors.primary : colors.textSecondary}
          />
        </View>
        <Text style={[styles.tabLabel, activeTab === 'home' && styles.activeTabLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Appointments Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('appointments')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'appointments' && styles.activeIconWrapper]}>
          <Ionicons
            name={activeTab === 'appointments' ? 'calendar' : 'calendar-outline'}
            size={20}
            color={activeTab === 'appointments' ? colors.primary : colors.textSecondary}
          />
        </View>
        <Text style={[styles.tabLabel, activeTab === 'appointments' && styles.activeTabLabel]}>
          Appointments
        </Text>
      </TouchableOpacity>

      {/* Prescriptions Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('prescriptions')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'prescriptions' && styles.activeIconWrapper]}>
          <MaterialCommunityIcons
            name={activeTab === 'prescriptions' ? 'file-document' : 'file-document-outline'}
            size={21}
            color={activeTab === 'prescriptions' ? colors.primary : colors.textSecondary}
          />
        </View>
        <Text style={[styles.tabLabel, activeTab === 'prescriptions' && styles.activeTabLabel]}>
          Prescriptions
        </Text>
      </TouchableOpacity>

      {/* Profile Tab */}
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('profile')}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper, activeTab === 'profile' && styles.activeIconWrapper]}>
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={20}
            color={activeTab === 'profile' ? colors.primary : colors.textSecondary}
          />
        </View>
        <Text style={[styles.tabLabel, activeTab === 'profile' && styles.activeTabLabel]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    backgroundColor: '#EFF6FF',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  activeTabLabel: {
    color: '#0080FF',
    fontWeight: '700',
  },
});
