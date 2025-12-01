import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../constants/api';

const TOKEN_KEY = 'pethope_token';

export async function saveToken(token) {
  try {
    console.log('Saving token...');
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log('Token saved successfully');
  } catch (e) {
    console.error('Failed to save token', e);
  }
}

export async function getToken() {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    console.log('Token retrieved:', token ? 'exists' : 'not found');
    return token;
  } catch (e) {
    console.error('Failed to get token', e);
    return null;
  }
}

export async function clearToken() {
  try {
    console.log('Clearing token...');
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log('Token cleared');
  } catch (e) {
    console.error('Failed to clear token', e);
  }
}

export async function apiFetch(path, options = {}) {
  const url = `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  console.log('🔵 API Request:', { url, method: fetchOptions.method || 'GET', hasToken: !!token });

  try {
    const res = await fetch(url, fetchOptions);
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      console.warn('⚠️ Response não é JSON:', text);
      data = text;
    }
    
    console.log('✅ API Response:', { 
      status: res.status, 
      url,
      dataType: Array.isArray(data) ? 'array' : typeof data,
      dataLength: Array.isArray(data) ? data.length : null
    });
    
    if (!res.ok) {
      const error = new Error(data?.error || `HTTP ${res.status}`);
      error.status = res.status;
      error.data = data;
      console.error('❌ API Error Response:', { status: res.status, error: data });
      throw error;
    }
    return data;
  } catch (err) {
    console.error('❌ API Error:', { message: err.message, url, status: err.status });
    throw err;
  }
}

export async function loginRequest(email, senha) {
  return apiFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}
