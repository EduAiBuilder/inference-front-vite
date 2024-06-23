import Axios from 'axios';

export const getClassificationData = async (data: any): Promise<any> => {
    const url = process.env.REACT_APP_INFERENCE_BACKEND_URL;
    if (!url) {
        throw new Error('backend url is not defined');
    }
    const endpoint = '/classify';
    const response = await Axios.post(`${url}${endpoint}`, data);
    return response?.data;
};
