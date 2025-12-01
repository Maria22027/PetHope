import { Platform } from 'react-native';

// Detecta se está em desenvolvimento
const isLocalDev = Platform.OS === 'web' ? process.env.NODE_ENV === 'development' : false;

// URL da API
export const API_URL = isLocalDev
  ? "http://localhost:3000"
  : "https://pethope.onrender.com/api";

console.log('API_URL:', API_URL, 'Platform:', Platform.OS);