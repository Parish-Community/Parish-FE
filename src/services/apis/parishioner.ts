import { POSITION_PARISH } from '@/core/constants/enum';
import { formatDateReq } from '@/utils/date';
import http, { setBearerToken } from '@/utils/http-common.ts';

export const fetchParishioners = async (page: number, searchText?: string) => {
  const queryParams = searchText ? `?page=${page}&searchText=${searchText}` : `?page=${page}`;
  try {
    const response = await http.get(`/parishioners${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioners:', error);
  }
};

export const fetchParishionerWithMonk = async () => {
  try {
    const response = await http.get(`/parishioners/monks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioner:', error);
  }
};

export const fetchParishCluster = async () => {
  try {
    const response = await http.get(`/parish-cluster`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioner:', error);
  }
};

export const createParishioner = async (data: any) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const formData = new FormData();
    const file = data.avatar;
    formData.append('file', file);
    const uploadAvatar = await http.post(`/cloudinary/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    data.avatar = uploadAvatar.data.data.secure_url;
    data.dateOfBirth = formatDateReq(data.dateOfBirth);
    console.log(data);
    const payload = {
      ...data,
      diocese: 'Hà Tĩnh',
      parish: 'Tràng Lưu',
      position: POSITION_PARISH.CHRISTIANITY
    };
    const response = await http.post(`/parishioners`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating:', error);
  }
};

export const updateParishioner = async (data: any) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const payload = {
      ...data,
      dateOfBirth: formatDateReq(data.dateOfBirth)
    };
    const response = await http.patch(`/parishioners/${data.id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating:', error);
  }
};

export const deleteParishioner = async (id: number) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.delete(`/parishioners/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting:', error);
  }
};

export const fetchTotalParishioner = async () => {
  try {
    setBearerToken(localStorage.getItem('access_token'));
    const response = await http.get(`/parishioners/statistics/total`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioner:', error);
  }
};
