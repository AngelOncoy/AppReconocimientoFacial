// /screens/PeopleListScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import api from '../services/api';

const PeopleListScreen = ({ navigation }) => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPeople = async () => {
        setLoading(true);
        try {
            const peopleList = await api.getPeopleList();
            setPeople(peopleList);
        } catch (error) {
            Alert.alert('Error', 'Error al obtener la lista de personas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Cuando se entra a la pantalla, cargar lista
        fetchPeople();
    }, []);

    const renderPerson = ({ item }) => {
        const personImageUri = api.getPersonImageUrl(item.user_id);

        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('Profile', { userId: item.user_id })}
            >
                <Image source={{ uri: personImageUri }} style={styles.image} />
                <View style={styles.cardContent}>
                    <Text style={styles.name}>{item.name} {item.last_name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.id}>ID: {item.user_id}</Text>
                    <Text style={[styles.status, item.requisitioned ? styles.statusRequisitioned : styles.statusNormal]}>
                        {item.requisitioned ? 'Requisitoriado' : 'Normal'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Personas</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#4f46e5" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={people}
                    keyExtractor={(item) => item.user_id}
                    renderItem={renderPerson}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}

            <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Volver al Inicio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 2,
        alignItems: 'center',
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: '#4f46e5',
        marginRight: 12,
    },
    cardContent: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    email: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    id: {
        fontSize: 12,
        color: '#6b7280',
    },
    status: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    statusRequisitioned: {
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
    },
    statusNormal: {
        backgroundColor: '#d1fae5',
        color: '#065f46',
    },
    buttonSecondary: {
        backgroundColor: '#374151',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PeopleListScreen;
