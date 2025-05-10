import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Simplified API configuration for emulator testing
console.log('Platform.OS:', Platform.OS); // Debug the platform

// For iOS simulator, use 'localhost'
// For Android emulator, use '10.0.2.2'
let API_HOST;
if (Platform.OS === 'ios') {
  API_HOST = 'localhost';
  console.log('Detected iOS - using localhost');
} else if (Platform.OS === 'android') {
  API_HOST = '10.0.2.2';
  console.log('Detected Android - using 10.0.2.2');
} else {
  API_HOST = 'localhost'; // Default fallback
  console.log('Unknown platform - defaulting to localhost');
}

const API_PORT = '3000';
const API_URL = `http://${API_HOST}:${API_PORT}`;

console.log(`API is configured to connect to: ${API_URL}`);

// Helper function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null, requireAuth = false) => {
  try {
    console.log(`Making ${method} request to: ${API_URL}/${endpoint}`);
    
    const headers = {
      'Content-Type': 'application/json',
    };

    // Add auth token to headers if required
    if (requireAuth) {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers,
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    console.log('Request config:', {
      url: `${API_URL}/${endpoint}`,
      method,
      headers,
      body: config.body ? JSON.stringify(data) : '(no data)'  // Show actual data for debugging
    });

    const response = await fetch(`${API_URL}/${endpoint}`, config);
    
    // Log response status
    console.log(`Response status: ${response.status}`);
    
    // Try to parse JSON response
    let result;
    try {
      result = await response.json();
      console.log('Response data:', result);
    } catch (e) {
      console.error('Error parsing response JSON:', e);
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Auth API functions
export const registerUser = async (userData) => {
  return apiRequest('register', 'POST', userData);
};

export const loginUser = async (credentials) => {
  const result = await apiRequest('login', 'POST', credentials);
  
  // Save token and user data to AsyncStorage
  if (result.success) {
    await AsyncStorage.setItem('token', result.token);
    await AsyncStorage.setItem('user', JSON.stringify(result.user));
  }
  
  return result;
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('user');
};

export const getCurrentUser = async () => {
  return apiRequest('me', 'GET', null, true);
};

export const updateProfile = async (profileData) => {
  return apiRequest('profile', 'PUT', profileData, true);
};

// Check if user is logged in
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  } catch (error) {
    return false;
  }
};

// Get stored user data
export const getStoredUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    return null;
  }
};

// Function to test API connectivity
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    // Try to make a simple GET request to the root endpoint
    const response = await fetch(API_URL);
    
    console.log('Response status:', response.status);
    
    // Try to get response text
    const text = await response.text();
    console.log('Response text:', text);
    
    return {
      success: true,
      status: response.status,
      message: text
    };
  } catch (error) {
    console.error('API connection test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}; 