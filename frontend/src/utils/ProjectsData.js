import axios from 'axios';

export const fetchProjects = async () => {
    try {
        const response = await axios.get('/api/projects/');
        return response.data.map(project => ({
            ...project,
            image_url: project.image_url || '/img/default-project.png',
            images: project.images || [project.image_url || '/img/default-project.png'], // Ensure we always have an array of images
        }));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const uploadProject = async (formData) => {
    try {
        const response = await axios.post('/api/projects/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading project:', error);
        throw error;
    }
};

export const uploadProjectWithChunks = async (formData, onProgress) => {
    const chunkSize = 1024 * 1024; // 1MB chunks
    const file = formData.get('video');
    
    if (file && file.size > chunkSize) {
        const totalChunks = Math.ceil(file.size / chunkSize);
        let uploadedChunks = 0;

        for (let start = 0; start < file.size; start += chunkSize) {
            const chunk = file.slice(start, start + chunkSize);
            const chunkFormData = new FormData();
            
            // Use Array.from() to convert FormData entries to an array
            Array.from(formData.entries()).forEach(([key, value]) => {
                if (key !== 'video') {
                    chunkFormData.append(key, value);
                }
            });
            
            chunkFormData.append('video', chunk, file.name);
            chunkFormData.append('chunk', String(uploadedChunks));
            chunkFormData.append('totalChunks', String(totalChunks));

            try {
                await axios.post('/api/projects/upload-chunk/', chunkFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                uploadedChunks++;
                if (onProgress) {
                    onProgress((uploadedChunks / totalChunks) * 100);
                }
            } catch (error) {
                console.error('Error uploading chunk:', error);
                throw error;
            }
        }

        // Final request to merge chunks
        try {
            const response = await axios.post('/api/projects/merge-chunks/', {
                filename: file.name,
                totalChunks: totalChunks,
            });

            return response.data;
        } catch (error) {
            console.error('Error merging chunks:', error);
            throw error;
        }
    } else {
        // For smaller files, use the original upload method
        return uploadProject(formData);
    }
};

export const uploadImages = async (projectId, imageFiles) => {
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
        formData.append(`image${index}`, file);
    });

    try {
        const response = await axios.post(`/api/projects/${projectId}/upload-images/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};

export const ProjectDataTypes = {
    id: '',
    title: '',
    about: '',
    stack: '',
    github_url: '',
    live_url: '',
    image_url: '',
    images: [], // New field for multiple images
    video_url: '',
    order: 0,
};

export const getProjectById = async (id) => {
    try {
        const response = await axios.get(`/api/projects/${id}/`);
        return {
            ...response.data,
            image_url: response.data.image_url || '/img/default-project.png',
            images: response.data.images || [response.data.image_url || '/img/default-project.png'],
        };
    } catch (error) {
        console.error(`Error fetching project with id ${id}:`, error);
        throw error;
    }
};
