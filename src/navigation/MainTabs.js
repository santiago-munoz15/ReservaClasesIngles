import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ClasesStack from "./ClasesStack";
import { colors } from "../theme";

import ReservasScreen from "../screens/ReservasScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primario,
        tabBarInactiveTintColor: colors.textoSuave,

              tabBarStyle: {
                  height: 65,
                  paddingTop: 5,
                  paddingBottom: 5,
                  backgroundColor: colors.superficie,
                  borderTopWidth: 1,
                  borderTopColor: colors.borde,
              },

              tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: "600",
              },
      }}
    >
          <Tab.Screen
              name="Clases"
              component={ClasesStack}
              options={{
                  tabBarIcon: ({ color, size, focused }) => (
                      <Ionicons
                          name={focused ? "book" : "book-outline"}
                          size={size}
                          color={color}
                      />
                  ),
              }}
          />

          <Tab.Screen
              name="Mis Reservas"
              component={ReservasScreen}
              options={{
                  tabBarIcon: ({ color, size, focused }) => (
                      <Ionicons
                          name={focused ? "calendar" : "calendar-outline"}
                          size={size}
                          color={color}
                      />
                  ),
              }}
          />

          <Tab.Screen
              name="Perfil"
              component={ClasesStack}
              options={{
                  tabBarIcon: ({ color, size, focused }) => (
                      <Ionicons
                          name={focused ? "person" : "person-outline"}
                          size={size}
                          color={color}
                      />
                  ),
              }}
          />
    </Tab.Navigator>
  );
}