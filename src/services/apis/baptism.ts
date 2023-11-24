import { formatDateReq } from '@/utils/date';
import http, { setBearerToken } from '@/utils/http-common.ts';

export const fetchBaptisms = async (page: number, searchText?: string) => {
  setBearerToken(localStorage.getItem('access_token'));
  const queryParams = searchText ? `?page=${page}&searchText=${searchText}` : `?page=${page}`;
  try {
    const response = await http.get(`/baptism${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching baptisms:', error);
  }
};

// delete baptism
export const deleteBaptism = async (baptismId: number) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.delete(`/baptism/${baptismId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting baptism:', error);
  }
};
