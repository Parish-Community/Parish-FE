import axios from 'axios';

const baseURL = 'http://localhost:8888/api/v1';

const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setBearerToken = (token: any) => {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default http;
