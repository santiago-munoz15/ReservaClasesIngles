import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing, typography, sombra } from "../theme";
import useAlmacenamiento from "../hooks/useAlmacenamiento";
import InfoPerfil from "../components/InfoPerfil";

// Formulario en blanco: se usa cuando la persona aún no está registrada
const FORMULARIO_VACIO = {
  nombre: "",
  correo: "",
  telefono: "",
};

// Reglas de negocio del perfil. Devuelve un mensaje por cada campo inválido;
// si el objeto sale vacío ({}), los datos son válidos.
function validarPerfil({ nombre, correo, telefono }) {
  const errores = {};

  // Nombre obligatorio: mínimo 3 letras
  if (nombre.trim().length < 3) {
    errores.nombre = "Escribe tu nombre completo (mínimo 3 letras).";
  }

  // Correo obligatorio: debe tener formato válido
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.trim())) {
    errores.correo = "Escribe un correo válido, por ejemplo nombre@correo.com.";
  }

  // Teléfono opcional: si se escribe, entre 7 y 12 dígitos
  const digitos = telefono.replace(/\D/g, "");
  if (telefono.trim() !== "" && (digitos.length < 7 || digitos.length > 12)) {
    errores.telefono = "El teléfono debe tener entre 7 y 12 dígitos.";
  }

  return errores;
}

// Campo de texto reutilizable para el formulario (muestra su error debajo)
function Campo({ etiqueta, error, ...props }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.etiquetaCampo}>{etiqueta}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={colors.textoSuave}
        {...props}
      />
      {error ? <Text style={styles.textoError}>{error}</Text> : null}
    </View>
  );
}

export default function PerfilScreen() {
  const insets = useSafeAreaInsets();

  // El perfil se guarda en el celular, así sigue ahí al cerrar la app
  // perfil = null significa que la persona todavía no está registrada
  const {
    valor: perfil,
    actualizar: guardarPerfil,
    listo,
  } = useAlmacenamiento("@reservaclases:perfil_registro", null);

  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [form, setForm] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});

  // Espera a que termine de leer lo guardado
  if (!listo) return null;

  const cambiar = (campo) => (valor) => {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
    // Al corregir un campo, se quita su error
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  // Regla: registrar abre el formulario vacío; editar lo abre con los datos cargados
  const abrirFormulario = () => {
    setForm(perfil ? { ...perfil } : FORMULARIO_VACIO);
    setErrores({});
    setMostrandoFormulario(true);
  };

  // Regla: solo existe un perfil; guardar reemplaza los datos anteriores
  const guardar = async () => {
    // Regla: no se guarda mientras haya errores
    const nuevosErrores = validarPerfil(form);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    await guardarPerfil({
      nombre: form.nombre.trim(),
      correo: form.correo.trim(),
      telefono: form.telefono.trim(),
    });
    setMostrandoFormulario(false);
    Alert.alert(
      perfil ? "Perfil actualizado" : "¡Registro exitoso!",
      "Tus datos se guardaron correctamente.",
    );
  };

  // Regla: cancelar cierra el formulario sin perder lo que ya estaba guardado
  const cancelar = () => {
    setErrores({});
    setMostrandoFormulario(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.pantalla, { paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.contenido}
      >
        <Text style={typography.titulo}>
          {mostrandoFormulario
            ? perfil
              ? "Editar perfil"
              : "Registro"
            : "Mi Perfil"}
        </Text>

        {mostrandoFormulario ? (
          <>
            <View style={[styles.seccion, sombra]}>
              <Campo
                etiqueta="Nombre completo *"
                value={form.nombre}
                onChangeText={cambiar("nombre")}
                error={errores.nombre}
                placeholder="Ej: Laura Gómez"
                autoCapitalize="words"
                maxLength={40}
              />
              <Campo
                etiqueta="Correo electrónico *"
                value={form.correo}
                onChangeText={cambiar("correo")}
                error={errores.correo}
                placeholder="nombre@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Campo
                etiqueta="Teléfono (opcional)"
                value={form.telefono}
                onChangeText={cambiar("telefono")}
                error={errores.telefono}
                placeholder="300 123 4567"
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>

            <Pressable style={styles.boton} onPress={guardar}>
              <Ionicons name="checkmark-outline" size={20} color="#FFFFFF" />
              <Text style={styles.textoBoton}>
                {perfil ? "Guardar cambios" : "Registrarme"}
              </Text>
            </Pressable>

            <Pressable style={styles.botonCancelar} onPress={cancelar}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </Pressable>
          </>
        ) : perfil ? (
          // Ya está registrada: solo se muestra su información
          <InfoPerfil perfil={perfil} onEditar={abrirFormulario} />
        ) : (
          // Sin registro: mensaje y botón para mostrar el formulario
          <View style={[styles.vacio, sombra]}>
            <View style={styles.avatarVacio}>
              <Ionicons
                name="person-outline"
                size={45}
                color={colors.textoSuave}
              />
            </View>

            <Text style={styles.tituloVacio}>Aún no estás registrado</Text>
            <Text style={styles.mensajeVacio}>
              Regístrate para guardar tus datos y reservar tus clases de inglés.
            </Text>

            <Pressable style={styles.botonRegistro} onPress={abrirFormulario}>
              <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />
              <Text style={styles.textoBoton}>Registrarme</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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

  seccion: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
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

  inputError: {
    borderColor: colors.peligro,
  },

  textoError: {
    fontSize: 12,
    color: colors.peligro,
    marginTop: spacing.xs,
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

  botonCancelar: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginTop: spacing.md,
  },

  textoCancelar: {
    color: colors.textoSuave,
    fontSize: 15,
    fontWeight: "700",
  },

  // Estado "sin registro"
  vacio: {
    alignItems: "center",
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginTop: spacing.lg,
  },

  avatarVacio: {
    width: 90,
    height: 90,
    borderRadius: radius.full,
    backgroundColor: colors.borde,
    justifyContent: "center",
    alignItems: "center",
  },

  tituloVacio: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.texto,
    marginTop: spacing.lg,
  },

  mensajeVacio: {
    fontSize: 14,
    color: colors.textoSuave,
    textAlign: "center",
    marginTop: spacing.sm,
  },

  botonRegistro: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    alignSelf: "stretch",
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
});
