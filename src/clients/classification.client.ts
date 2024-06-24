import Axios from 'axios';

export const getClassificationData = async (data: any, model: string): Promise<any> => {
    const url = import.meta.env.VITE_INFERENCE_BACKEND_URL;
    if (!url) {
        throw new Error('backend url is not defined');
    }
    const endpoint = '/classify';
    const response = await Axios.post(`${url}${endpoint}`, data);
    return response?.data;
};
