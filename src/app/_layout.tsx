import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { ClinicProvider } from '../context/ClinicContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ClinicProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#F8FAFD' },
              animation: 'slide_from_right',
            }}
          />
        </ClinicProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
