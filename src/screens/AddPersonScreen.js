// /screens/AddPersonScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import api from '../services/api';

const AddPersonScreen = ({ navigation, route }) => {
    const { selectedImageUri } = route.params || {};

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        lastName: '',
        email: '',
        requisitioned: false,
    });

    const handleSave = async () => {
        if (!formData.id || !formData.name || !formData.lastName || !formData.email) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        try {
            await api.registerUser({
                userId: formData.id,
                name: formData.name,
                lastName: formData.lastName,
                email: formData.email,
                requisitioned: formData.requisitioned,
                imageUri: selectedImageUri,
            });

            Alert.alert('Éxito', 'Agregado correctamente.', [
                { text: 'OK', onPress: () => navigation.navigate('Home') },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Error al registrar la persona.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar Persona</Text>
            <Text style={styles.subtitle}>Completa la información para registrar este rostro</Text>

            <Image source={{ uri: selectedImageUri }} style={styles.image} />

            <TextInput
                placeholder="ID"
                style={styles.input}
                value={formData.id}
                onChangeText={(text) => setFormData({ ...formData, id: text })}
            />
            <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            <TextInput
                placeholder="Apellido"
                style={styles.input}
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
            />
            <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
            />

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={[styles.checkbox, formData.requisitioned && styles.checkboxChecked]}
                    onPress={() => setFormData({ ...formData, requisitioned: !formData.requisitioned })}
                />
                <Text style={styles.checkboxLabel}>Requisitoriado</Text>
            </View>

            <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar Persona</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f4f8',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
        textAlign: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4f46e5',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        width: '100%',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#4f46e5',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: '#4f46e5',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#1f2937',
    },
    buttonPrimary: {
        backgroundColor: '#4f46e5',
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
        width: '100%',
    },
    buttonSecondary: {
        backgroundColor: '#374151',
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddPersonScreen;
