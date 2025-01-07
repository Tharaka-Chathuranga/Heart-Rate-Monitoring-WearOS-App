import axios, { AxiosResponse } from 'axios';
import { HeartRateData } from 'src/types/heartRate';

const API_BASE_URL = 'YOUR_AWS_API_ENDPOINT/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendHeartRate = async (data: HeartRateData): Promise<AxiosResponse<void>> => {
  try {
    return await api.post<void>('/heart-rate', data);
  } catch (error) {
    throw error;
  }
};