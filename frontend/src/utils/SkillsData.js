import axios from 'axios';

export const fetchSkills = async () => {
    try {
        const response = await axios.get('/api/skills/');
        return response.data;
    } catch (error) {
        console.error('Error fetching skills data:', error);
        return [];
    }
};
