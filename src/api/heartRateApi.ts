import { io, Socket } from 'socket.io-client';
import { HeartRateData } from 'src/types/heartRate';
import { Platform } from 'react-native';

// Use appropriate IP address based on platform
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    // Android emulator uses 10.0.2.2 to access localhost
    return 'http://10.0.2.2:3001';
  } else if (Platform.OS === 'ios') {
    // iOS simulator can use localhost
    return 'http://localhost:3001';
  }
  return 'http://localhost:3001';
};

const API_BASE_URL = getBaseUrl();
let socket: Socket | null = null;

export const connectWebSocket = () => {
  try {
    if (socket?.connected) {
      console.log('WebSocket already connected');
      return;
    }

    socket = io(API_BASE_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      forceNew: true,
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error.message);
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    socket.on('heart_rate_response', (data: any) => {
      console.log('Received response:', data);
    });

  } catch (error) {
    console.error('Error initializing WebSocket:', error);
  }
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const sendHeartRate = (data: HeartRateData) => {
  try {
    if (socket?.connected) {
      socket.emit('heart_rate', data);
      console.log('Heart rate data sent:', data);
    } else {
      console.warn('Socket not connected. Attempting to reconnect...');
      connectWebSocket();
      // Retry sending data after a short delay
      setTimeout(() => {
        if (socket?.connected) {
          socket.emit('heart_rate', data);
          console.log('Heart rate data sent after reconnection:', data);
        } else {
          console.error('Failed to send heart rate data: Socket still not connected');
        }
      }, 1000);
    }
  } catch (error) {
    console.error('Error sending heart rate data:', error);
  }
};