import axios from 'axios';
import { Credential } from '../model/Credential';
import { getToken } from '../auth/auth';

const API_URL = 'http://localhost:5148/api';

export const fetchUserCredentials = async (): Promise<Credential[]> => {
    const token = getToken();

    const response = await axios.get(`${API_URL}/Password/user/password-entries`, {
        headers: {
            Authorization: `Bearer ${token}`,
        } // include if backend expects cookies as well
    });

    return response.data;
};

export const showPasswordByUuid = async (uuid: string): Promise<string> => {
    const token = getToken();
    const res = await axios.get(`${API_URL}/Password/password-entry/${uuid}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        });
    return res.data;
};

export const deletePasswordByUuid = async (uuid: string): Promise<void> => {
    const token = getToken();
    const res = await axios.delete(`${API_URL}/Password/password-entry/${uuid}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        });
    return res.data;
};

