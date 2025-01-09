import axios from 'axios';

export const fetchProfile = async () => {
    try {
        const response = await axios.get('/api/profile/');
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};
