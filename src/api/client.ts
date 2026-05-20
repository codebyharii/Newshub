import axios from 'axios';

// Since we are not strictly using react-native-dotenv to keep things simple and core,
// we'll use the URL directly, but ideally it would be process.env.BASE_URL
const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // We can add global error logging here
    return Promise.reject(error);
  }
);
