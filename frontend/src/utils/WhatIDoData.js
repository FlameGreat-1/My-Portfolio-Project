import axios from 'axios';

export const fetchWhatIDo = async () => {
    try {
        const response = await axios.get('/api/what-i-do/');
        return response.data;
    } catch (error) {
        console.error('Error fetching what I do data:', error);
        return [];
    }
};
