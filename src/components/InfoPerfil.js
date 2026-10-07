import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, spacing, typography, sombra } from "../theme";

// Fila de la sección "Información personal"
function FilaDato({ icono, etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Ionicons name={icono} size={22} color={colors.primario} />

      <View style={{ flex: 1 }}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>
        <Text style={styles.valor}>{valor}</Text>
      </View>
    </View>
  );
}

// Muestra la información de la persona registrada y el botón para editarla
export default function InfoPerfil({ perfil, onEditar }) {
  return (
    <>
      <View style={[styles.tarjetaPerfil, sombra]}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={45} color={colors.primario} />
        </View>

        <Text style={styles.nombre}>{perfil.nombre}</Text>
        <Text style={styles.correo}>{perfil.correo}</Text>
      </View>

      <View style={[styles.seccion, sombra]}>
        <Text style={styles.tituloSeccion}>Información personal</Text>

        <FilaDato
          icono="person-outline"
          etiqueta="Nombre"
          valor={perfil.nombre}
        />
        <FilaDato
          icono="mail-outline"
          etiqueta="Correo"
          valor={perfil.correo}
        />
        <FilaDato
          icono="call-outline"
          etiqueta="Teléfono"
          valor={perfil.telefono || "No registrado"}
        />
      </View>

      <Pressable style={styles.boton} onPress={onEditar}>
        <Ionicons name="create-outline" size={20} color="#FFFFFF" />
        <Text style={styles.textoBoton}>Editar perfil</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
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
