import axios from 'axios';
import { RouteObject } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const requireAuth = async (to: RouteObject) => {
  try {
    const response = await axios.get('/check-auth-endpoint');
    return response.data.isAuthenticated === true;
  } catch (error) {
    return true;
  }
};
