import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, spacing} from '../theme';

export default function LabelLevel({level}) {
    return (
        <View style={[styles.contenedor, {backgroundColor: colors.fondo}]}>
            <Text style={styles.texto}>{level}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        alingSelf:'auto',
        paddingVertical: 3,
        paddingHorizontal: spacing.md,
        borderWidth: 1

    },
    texto: {
        fontSize: 11,
        fontWeight: '700',
        letterspacing: 0.3,
    }
})