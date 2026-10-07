import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing } from "../theme";

export default function InfoPerfil({ icono, etiqueta, valor }) {
  return (
    <View style={styles.fila}>
      <Ionicons name={icono} size={22} color={colors.primario} />

      <View style={styles.contenido}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>
        <Text style={styles.valor}>{valor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },

  contenido: {
    flex: 1,
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
});
