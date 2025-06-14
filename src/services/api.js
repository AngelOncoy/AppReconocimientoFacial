// /services/api.js

const BASE_URL = 'http://127.0.0.1:8000/api';
// Ejemplo en local con Android Studio: 'http://10.0.2.2:8000/api'
// Ejemplo en Expo Go en red local: 'http://192.168.x.x:8000/api' (ip de tu pc)

const api = {

    // Obtener lista de personas
    async getPeopleList() {
        try {
            const response = await fetch(`${BASE_URL}/listar_usuarios`);
            const data = await response.json();
            return data.users;
        } catch (error) {
            console.error('Error getPeopleList:', error);
            throw error;
        }
    },

    // Obtener perfil de persona
    async getPersonProfile(userId) {
        try {
            const response = await fetch(`${BASE_URL}/usuario/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getPersonProfile:', error);
            throw error;
        }
    },

    // Obtener imagen de persona
    getPersonImageUrl(userId) {
        return `${BASE_URL}/usuario/${userId}/imagen`;
    },

    // Comparar imagen
    async compareImage(imageUri) {
        const formData = new FormData();
        formData.append('file', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await fetch(`${BASE_URL}/comparar`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error compareImage:', error);
            throw error;
        }
    },

    // Registrar usuario nuevo
    async registerUser({ userId, name, lastName, email, requisitioned, imageUri }) {
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('name', name);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('requisitioned', requisitioned ? 'true' : 'false');
        formData.append('file', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        try {
            const response = await fetch(`${BASE_URL}/registrar_usuario`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error registerUser:', error);
            throw error;
        }
    },

    // Editar usuario
    async editUser({ userId, name, lastName, email, requisitioned, imageUri }) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('requisitioned', requisitioned ? 'true' : 'false');

        if (imageUri) {
            formData.append('file', {
                uri: imageUri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });
        }

        try {
            const response = await fetch(`${BASE_URL}/editar_usuario/${userId}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error editUser:', error);
            throw error;
        }
    },

    // Eliminar usuario
    async deleteUser(userId) {
        try {
            const response = await fetch(`${BASE_URL}/eliminar_usuario/${userId}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleteUser:', error);
            throw error;
        }
    },

};

export default api;
