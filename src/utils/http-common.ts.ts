import axios from 'axios';

const baseURL = 'http://localhost:8888/api/v1';

const http = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http;
