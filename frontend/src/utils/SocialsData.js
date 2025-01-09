import axios from 'axios';

export const fetchSocials = async () => {
    try {
        const response = await axios.get('/api/socials/');
        return response.data;
    } catch (error) {
        console.error('Error fetching socials data:', error);
        return [];
    }
};
