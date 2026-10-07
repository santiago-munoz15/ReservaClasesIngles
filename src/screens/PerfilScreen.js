import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing, typography, sombra } from "../theme";
import useAlmacenamiento from "../hooks/useAlmacenamiento";

// Datos de ejemplo: en el commit 5 el perfil empezará vacío (null)
const PERFIL_EJEMPLO = {
  nombre: "Usuario",
  correo: "usuario@email.com",
  telefono: "300 000 0000",
};

// Campo de texto reutilizable para el formulario
function Campo({ etiqueta, ...props }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.etiquetaCampo}>{etiqueta}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textoSuave}
        {...props}
      />
    </View>
  );
}

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();

  // El perfil se guarda en el celular, así sigue ahí al cerrar la app
  const {
    valor: perfil,
    actualizar: guardarPerfil,
    listo,
  } = useAlmacenamiento("@reservaclases:perfil", PERFIL_EJEMPLO);

  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [form, setForm] = useState(PERFIL_EJEMPLO);

  // Espera a que termine de leer lo guardado
  if (!listo) return null;

  const cambiar = (campo) => (valor) =>
    setForm((anterior) => ({ ...anterior, [campo]: valor }));

  // Regla: al editar, el formulario se abre con los datos actuales cargados
  const abrirFormulario = () => {
    setForm({ ...perfil });
    setMostrandoFormulario(true);
  };

  // Regla: solo existe un perfil; guardar reemplaza los datos anteriores
  const guardar = async () => {
    await guardarPerfil({
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim(),
    });
    setMostrandoFormulario(false);
  };

  return (
    <View style={[styles.pantalla, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenido}
      >
        <Text style={typography.titulo}>
          {mostrandoFormulario ? "Editar perfil" : "Mi Perfil"}
        </Text>

        {mostrandoFormulario ? (
          <>
            <View style={[styles.seccion, sombra]}>
              <Campo
                etiqueta="Nombre completo"
                value={form.nombre}
                onChangeText={cambiar("nombre")}
                placeholder="Ej: Laura Gómez"
                autoCapitalize="words"
                maxLength={40}
              />
              <Campo
                etiqueta="Correo electrónico"
                value={form.correo}
                onChangeText={cambiar("correo")}
                placeholder="nombre@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Campo
                etiqueta="Teléfono"
                value={form.telefono}
                onChangeText={cambiar("telefono")}
                placeholder="300 123 4567"
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>

            <Pressable style={styles.boton} onPress={guardar}>
              <Ionicons name="checkmark-outline" size={20} color="#FFFFFF" />
              <Text style={styles.textoBoton}>Guardar cambios</Text>
            </Pressable>
          </>
        ) : (
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

              <View style={styles.fila}>
                <Ionicons
                  name="person-outline"
                  size={22}
                  color={colors.primario}
                />

                <View>
                  <Text style={styles.etiqueta}>Nombre</Text>
                  <Text style={styles.valor}>{perfil.nombre}</Text>
                </View>
              </View>

              <View style={styles.fila}>
                <Ionicons
                  name="mail-outline"
                  size={22}
                  color={colors.primario}
                />

                <View>
                  <Text style={styles.etiqueta}>Correo</Text>
                  <Text style={styles.valor}>{perfil.correo}</Text>
                </View>
              </View>

              <View style={styles.fila}>
                <Ionicons
                  name="call-outline"
                  size={22}
                  color={colors.primario}
                />

                <View>
                  <Text style={styles.etiqueta}>Teléfono</Text>
                  <Text style={styles.valor}>{perfil.telefono}</Text>
                </View>
              </View>
            </View>

            <Pressable style={styles.boton} onPress={abrirFormulario}>
              <Ionicons name="create-outline" size={20} color="#FFFFFF" />
              <Text style={styles.textoBoton}>Editar perfil</Text>
            </Pressable>
          </>
        )}
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

  // Formulario
  campo: {
    marginBottom: spacing.lg,
  },

  etiquetaCampo: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.texto,
    marginBottom: spacing.xs,
  },

  input: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: 15,
    color: colors.texto,
    backgroundColor: colors.fondo,
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
