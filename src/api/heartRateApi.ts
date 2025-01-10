import axios, { AxiosResponse } from 'axios';
import { HeartRateData } from 'src/types/heartRate';

// Replace 'YOUR_AWS_API_ENDPOINT' with your actual AWS API endpoint
const API_BASE_URL = 'YOUR_AWS_API_ENDPOINT/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends heart rate data to the backend.
 * @param {HeartRateData} data - Heart rate data to be sent.
 * @returns {Promise<AxiosResponse<void>>} - The Axios response.
 */
export const sendHeartRate = async (data: HeartRateData): Promise<AxiosResponse<void>> => {
  try {
    return await api.post<void>('/heart-rate', data);
  } catch (error) {
    throw error;
  }
};