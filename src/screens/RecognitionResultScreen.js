// /screens/RecognitionResultScreen.js

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const RecognitionResultScreen = ({ navigation, route }) => {
    const { selectedImageUri, detectedFace, similarity, dbImageUri, matchedUser } = route.params || {};

    const [showUnknownModal, setShowUnknownModal] = useState(!detectedFace);

    const handleAddPerson = () => {
        setShowUnknownModal(false);
        navigation.replace('AddPerson', { selectedImageUri });
    };

    return (
        <View style={styles.container}>

            {detectedFace ? (
                <>
                    <Text style={styles.title}>¡Coincidencia Encontrada!</Text>
                    <Text style={styles.similarityText}>Precisión: {similarity ? `${similarity}%` : '--'}</Text>

                    {/* Imagenes en fila */}
                    <View style={styles.imagesRow}>
                        <View style={styles.imageCard}>
                            <Text style={styles.imageLabel}>Imagen enviada</Text>
                            <Image source={{ uri: selectedImageUri }} style={styles.image} />
                        </View>

                        <View style={styles.imageCard}>
                            <Text style={styles.imageLabel}>Imagen en base de datos</Text>
                            <Image source={{ uri: dbImageUri }} style={styles.image} />
                        </View>
                    </View>

                    {/* Info del usuario */}
                    {matchedUser && (
                        <View style={styles.userInfoCard}>
                            <Text style={styles.userInfoText}>ID: {matchedUser.user_id}</Text>
                            <Text style={styles.userInfoText}>Nombre: {matchedUser.name} {matchedUser.last_name}</Text>
                            <Text style={styles.userInfoText}>Correo: {matchedUser.email}</Text>
                            <Text style={styles.userInfoText}>Estado: {matchedUser.requisitioned ? 'Requisitoriado' : 'Normal'}</Text>
                        </View>
                    )}

                    <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>Volver al Inicio</Text>
                    </TouchableOpacity>
                </>
            ) : null}

            {/* Modal de rostro desconocido */}
            <Modal
                visible={showUnknownModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowUnknownModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>No Encontrado</Text>
                        <Text style={styles.modalSubtitle}>No se encontró coincidencia en la base de datos.</Text>

                        <Image source={{ uri: selectedImageUri }} style={styles.modalImage} />

                        <TouchableOpacity style={styles.buttonPrimary} onPress={handleAddPerson}>
                            <Text style={styles.buttonText}>Agregar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    similarityText: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 16,
    },
    imagesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    imageCard: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    imageLabel: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 8,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4f46e5',
    },
    userInfoCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        elevation: 3,
        width: '100%',
        marginBottom: 20,
    },
    userInfoText: {
        fontSize: 14,
        color: '#1f2937',
        marginBottom: 4,
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#4f46e5',
        marginBottom: 20,
    },
});

export default RecognitionResultScreen;
