// /screens/ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

const ProfileScreen = ({ navigation, route }) => {
    const { userId } = route.params || {};
    const [profile, setProfile] = useState(null);
    const [imageUri, setImageUri] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        lastName: '',
        email: '',
        requisitioned: false,
    });
    const [loading, setLoading] = useState(false);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const profileData = await api.getPersonProfile(userId);
            setProfile(profileData);
            setEditForm({
                name: profileData.name,
                lastName: profileData.last_name,
                email: profileData.email,
                requisitioned: profileData.requisitioned,
            });
            setImageUri(api.getPersonImageUrl(userId));
        } catch (error) {
            Alert.alert('Error', 'Error al obtener el perfil.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        try {
            await api.editUser({
                userId: profile.user_id,
                name: editForm.name,
                lastName: editForm.lastName,
                email: editForm.email,
                requisitioned: editForm.requisitioned,
                imageUri: imageUri.startsWith('http') ? null : imageUri,
            });

            Alert.alert('Éxito', 'Perfil actualizado.', [
                { text: 'OK', onPress: () => setIsEditing(false) },
            ]);
            fetchProfile(); // recargar perfil
        } catch (error) {
            Alert.alert('Error', 'Error al actualizar el perfil.');
        }
    };

    const handleDelete = async () => {
        Alert.alert('Confirmación', '¿Estás seguro de que deseas eliminar esta persona?', [
            { text: 'Cancelar' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await api.deleteUser(profile.user_id);
                        Alert.alert('Eliminado', 'Persona eliminada correctamente.', [
                            { text: 'OK', onPress: () => navigation.navigate('PeopleList') },
                        ]);
                    } catch (error) {
                        Alert.alert('Error', 'Error al eliminar la persona.');
                    }
                },
            },
        ]);
    };

    if (loading || !profile) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Perfil de Usuario</Text>

            <Image source={{ uri: imageUri }} style={styles.image} />

            {isEditing ? (
                <>
                    <TouchableOpacity style={styles.buttonPrimary} onPress={handlePickImage}>
                        <Text style={styles.buttonText}>Cambiar Imagen</Text>
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Nombre"
                        style={styles.input}
                        value={editForm.name}
                        onChangeText={(text) => setEditForm({ ...editForm, name: text })}
                    />
                    <TextInput
                        placeholder="Apellido"
                        style={styles.input}
                        value={editForm.lastName}
                        onChangeText={(text) => setEditForm({ ...editForm, lastName: text })}
                    />
                    <TextInput
                        placeholder="Correo electrónico"
                        style={styles.input}
                        value={editForm.email}
                        onChangeText={(text) => setEditForm({ ...editForm, email: text })}
                        keyboardType="email-address"
                    />
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[styles.checkbox, editForm.requisitioned && styles.checkboxChecked]}
                            onPress={() => setEditForm({ ...editForm, requisitioned: !editForm.requisitioned })}
                        />
                        <Text style={styles.checkboxLabel}>Requisitoriado</Text>
                    </View>

                    <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
                        <Text style={styles.buttonText}>Guardar Cambios</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSecondary} onPress={() => setIsEditing(false)}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.infoText}>ID: {profile.user_id}</Text>
                    <Text style={styles.infoText}>Nombre: {profile.name} {profile.last_name}</Text>
                    <Text style={styles.infoText}>Correo: {profile.email}</Text>
                    <Text style={styles.infoText}>Estado: {profile.requisitioned ? 'Requisitoriado' : 'Normal'}</Text>

                    <TouchableOpacity style={styles.buttonPrimary} onPress={() => setIsEditing(true)}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonError} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </>
            )}

            <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('PeopleList')}>
                <Text style={styles.buttonText}>Volver a la Lista</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
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
        marginBottom: 16,
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
    infoText: {
        fontSize: 16,
        color: '#1f2937',
        marginBottom: 8,
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
    buttonError: {
        backgroundColor: '#b91c1c',
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

export default ProfileScreen;
