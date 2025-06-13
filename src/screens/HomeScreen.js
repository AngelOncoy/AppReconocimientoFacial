// /screens/HomeScreen.js

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({ navigation }) => {

    useEffect(() => {
        // Pedir permisos al entrar a la screen
        (async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso requerido', 'Se requiere permiso para acceder a la cámara.');
            }
        })();
    }, []);

    const handleSelectImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            navigation.navigate('Processing', { selectedImageUri: imageUri });
        }
    };

    const handleTakePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            navigation.navigate('Processing', { selectedImageUri: imageUri });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerIcon}>
                    <Text style={styles.headerIconText}>🎯</Text>
                </View>
                <Text style={styles.title}>App Reconocimiento Facial</Text>
                <Text style={styles.subtitle}>
                    Tecnología avanzada de IA para identificar rostros de forma instantánea y segura
                </Text>
            </View>

            <View style={styles.howItWorks}>
                <Text style={styles.howItWorksTitle}>¿Cómo funciona?</Text>

                <View style={styles.step}>
                    <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
                    <Text style={styles.stepText}>Selecciona una imagen o toma una foto</Text>
                </View>

                <View style={styles.step}>
                    <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
                    <Text style={styles.stepText}>Análisis inteligente del rostro</Text>
                </View>

                <View style={styles.step}>
                    <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
                    <Text style={styles.stepText}>Resultados instantáneos</Text>
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonPrimary} onPress={handleSelectImage}>
                    <Text style={styles.buttonText}>Seleccionar Imagen</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={handleTakePhoto}>
                    <Text style={styles.buttonText}>Tomar Foto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('PeopleList')}>
                    <Text style={styles.buttonText}>Lista de Personas</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
    },
    headerIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#4f46e5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerIconText: {
        fontSize: 28,
        color: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#6b7280',
    },
    howItWorks: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        elevation: 3,
    },
    howItWorksTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#374151',
        marginBottom: 12,
        textAlign: 'center',
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4f46e5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    stepNumberText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    stepText: {
        fontSize: 14,
        color: '#6b7280',
    },
    buttons: {
        marginTop: 20,
    },
    buttonPrimary: {
        backgroundColor: '#4f46e5',
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
    },
    buttonSecondary: {
        backgroundColor: '#374151',
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
