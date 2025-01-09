import axios from 'axios';

export const fetchAboutMe = async () => {
    try {
        const response = await axios.get('/api/about-me/');
        return response.data;
    } catch (error) {
        console.error('Error fetching about me data:', error);
        return { content: '' };
    }
};
