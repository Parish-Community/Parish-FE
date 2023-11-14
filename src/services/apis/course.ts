import http, { setBearerToken } from '@/utils/http-common.ts';

export const fetchCoupleRegistration = async () => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.get('/course/couple-registration');
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioners:', error);
  }
};

export const fetchCourses = async () => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.get(`/course`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
  }
};

export const fetchCourse = async (id: string) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
  }
};

export const createCourse = async (data: any) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.post(`/course`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
  }
};
