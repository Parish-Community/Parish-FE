import { formatDateReq } from '@/utils/date';
import http, { setBearerToken } from '@/utils/http-common.ts';

interface AcceptedBaptismDto {
  baptismId: number;
  priestBaptism: string;
  dateBaptism: any;
  parish_clusterId: number;
}

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

export const updateBaptism = async (data: AcceptedBaptismDto) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.patch(`/baptism/${data.baptismId}/accept`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating baptism:', error);
  }
};

export const deleteBaptism = async (baptismId: number) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.delete(`/baptism/${baptismId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting baptism:', error);
  }
};
