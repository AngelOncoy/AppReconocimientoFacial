// /screens/ProcessingScreen.js

import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../services/api';

const ProcessingScreen = ({ navigation, route }) => {
    const { selectedImageUri } = route.params || {};

    useEffect(() => {
        const processImage = async () => {
            try {
                const result = await api.compareImage(selectedImageUri);

                // Simular pequeño delay visual
                setTimeout(() => {
                    navigation.replace('RecognitionResult', {
                        selectedImageUri,
                        detectedFace: result.match,
                        similarity: result.similarity ? (result.similarity * 100).toFixed(2) : 0,
                        dbImageUri: result.match ? api.getPersonImageUrl(result.user_data.user_id) : null,
                        matchedUser: result.match ? result.user_data : null,
                    });
                }, 1000); // 1 segundo
            } catch (error) {
                Alert.alert('Error', 'Error al procesar la imagen.');
                navigation.navigate('Home');
            }
        };

        processImage();
    }, [selectedImageUri, navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: selectedImageUri }}
                    style={styles.image}
                />
            </View>

            <View style={styles.loadingSection}>
                <ActivityIndicator size="large" color="#4f46e5" style={{ marginBottom: 16 }} />
                <Text style={styles.loadingTitle}>Analizando Rostro</Text>
                <Text style={styles.loadingSubtitle}>Procesando con inteligencia artificial...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        paddingHorizontal: 20,
        paddingVertical: 40,
        justifyContent: 'space-between',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4f46e5',
    },
    loadingSection: {
        alignItems: 'center',
    },
    loadingTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 4,
    },
    loadingSubtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
});

export default ProcessingScreen;
