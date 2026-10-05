import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, typography } from "../theme";
import { useReservas } from "../context/ReservasContext";
import EtiquetaNivel from "../components/EtiquetaNivel";

export default function ReservasScreen() {
  const { reservas, eliminarReserva } = useReservas();

  const cancelarReserva = (idReserva) => {
    Alert.alert(
      "Cancelar reserva",
      "¿Deseas cancelar esta reserva?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí, cancelar",
          onPress: () => eliminarReserva(idReserva),
        },
      ]
    );
  };

  return (
    <View style={styles.pantalla}>
      <Text style={typography.titulo}>Mis Reservas</Text>

      <FlatList
        data={reservas}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.reserva}>
            <Image
              source={{ uri: item.imagen }}
              style={styles.imagen}
            />

            <View style={styles.contenido}>
              <View style={styles.filaNivel}>
                <EtiquetaNivel nivel={item.nivel} />
              </View>

              <Text style={styles.tituloReserva}>
                {item.titulo}
              </Text>

              <View style={styles.fila}>
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={colors.textoSuave}
                />
                <Text style={styles.texto}>
                  {item.profesor.nombre}
                </Text>
              </View>

              <View style={styles.fila}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={colors.textoSuave}
                />
                <Text style={styles.texto}>
                  {item.horario}
                </Text>
              </View>

              <View style={styles.fila}>
                <Ionicons
                  name="laptop-outline"
                  size={16}
                  color={colors.textoSuave}
                />
                <Text style={styles.texto}>
                  {item.modalidad}
                </Text>
                <Pressable
                  style={styles.botonCancelar}
                  onPress={() => cancelarReserva(item.id)}
                >
                  <Text style={styles.textoCancelar}>
                    Cancelar reserva
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Ionicons
              name="calendar-outline"
              size={48}
              color={colors.textoSuave}
            />

            <Text style={styles.mensaje}>
              Aún no tienes reservas
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  botonCancelar: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
  },

  textoCancelar: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textoSuave,
  },
  
  pantalla: {
    flex: 1,
    backgroundColor: colors.fondo,
    padding: spacing.lg,
  },

  lista: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  reserva: {
    flexDirection: "row",
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.lg,
    overflow: "hidden",
    marginBottom: spacing.md,
  },

  imagen: {
    width: 120,
    height: 150,
    backgroundColor: colors.primarioSuave,
  },

  contenido: {
    flex: 1,
    padding: spacing.md,
  },

  filaNivel: {
    marginBottom: spacing.sm,
  },

  tituloReserva: {
    ...typography.subtitulo,
    color: colors.texto,
    marginBottom: spacing.sm,
  },

  fila: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
  },

  texto: {
    flex: 1,
    fontSize: 13,
    color: colors.textoSuave,
  },

  vacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 120,
  },

  mensaje: {
    fontSize: 16,
    color: colors.textoSuave,
    marginTop: spacing.md,
  },
});