import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainTabs from './src/navigation/MainTabs';
import { colors } from './src/theme';
import { ReservasProvider } from "./src/context/ReservasContext";

const temaNavigation = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ReservasProvider>
        <NavigationContainer theme={temaNavigation}>
          <MainTabs />
        </NavigationContainer>
      </ReservasProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider >
  );
}
