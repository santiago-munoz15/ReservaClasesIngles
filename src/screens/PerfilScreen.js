import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing, typography, sombra } from "../theme";

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.pantalla, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenido}
      >
        <Text style={typography.titulo}>Mi Perfil</Text>

        <View style={[styles.tarjetaPerfil, sombra]}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={45} color={colors.primario} />
          </View>

          <Text style={styles.nombre}>Usuario</Text>
          <Text style={styles.correo}>usuario@email.com</Text>
        </View>

        <View style={[styles.seccion, sombra]}>
          <Text style={styles.tituloSeccion}>Información personal</Text>

          <View style={styles.fila}>
            <Ionicons name="person-outline" size={22} color={colors.primario} />

            <View>
              <Text style={styles.etiqueta}>Nombre</Text>
              <Text style={styles.valor}>Usuario</Text>
            </View>
          </View>

          <View style={styles.fila}>
            <Ionicons name="mail-outline" size={22} color={colors.primario} />

            <View>
              <Text style={styles.etiqueta}>Correo</Text>
              <Text style={styles.valor}>usuario@email.com</Text>
            </View>
          </View>

          <View style={styles.fila}>
            <Ionicons name="call-outline" size={22} color={colors.primario} />

            <View>
              <Text style={styles.etiqueta}>Teléfono</Text>
              <Text style={styles.valor}>300 000 0000</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.boton}>
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
          <Text style={styles.textoBoton}>Editar perfil</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
  },

  contenido: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },

  tarjetaPerfil: {
    alignItems: "center",
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginTop: spacing.lg,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: radius.full,
    backgroundColor: colors.primarioSuave,
    justifyContent: "center",
    alignItems: "center",
  },

  nombre: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.texto,
    marginTop: spacing.md,
  },

  correo: {
    fontSize: 14,
    color: colors.textoSuave,
    marginTop: spacing.xs,
  },

  seccion: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },

  tituloSeccion: {
    ...typography.subtitulo,
    marginBottom: spacing.md,
  },

  fila: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borde,
  },

  etiqueta: {
    fontSize: 12,
    color: colors.textoSuave,
  },

  valor: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.texto,
    marginTop: 2,
  },

  boton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
