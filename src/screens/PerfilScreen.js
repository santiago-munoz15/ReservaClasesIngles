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
import InfoPerfil from "../components/InfoPerfil";

// Datos de ejemplo: en el commit 5 el perfil empezará vacío (null)
const PERFIL_EJEMPLO = {
  nombre: "Usuario",
  correo: "usuario@email.com",
  telefono: "300 000 0000",
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
  const {
    valor: perfil,
    actualizar: guardarPerfil,
    listo,
  } = useAlmacenamiento("@reservaclases:perfil", PERFIL_EJEMPLO);

  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [form, setForm] = useState(PERFIL_EJEMPLO);
  const [errores, setErrores] = useState({});

  // Espera a que termine de leer lo guardado
  if (!listo) return null;

  const cambiar = (campo) => (valor) => {
    setForm((anterior) => ({ ...anterior, [campo]: valor }));
    // Al corregir un campo, se quita su error
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }));
  };

  // Regla: al editar, el formulario se abre con los datos actuales cargados
  const abrirFormulario = () => {
    setForm({ ...perfil });
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
              <Text style={styles.textoBoton}>Guardar cambios</Text>
            </Pressable>
          </>
        ) : (
          <InfoPerfil perfil={perfil} onEditar={abrirFormulario} />
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
});
