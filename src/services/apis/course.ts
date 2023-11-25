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

export const fetchCourses = async (query?: any) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const params = {
      courseStatus: query
    };
    const response = await http.get(`/course`, { params });
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

export const acceptRegistration = async (id: string, data: any) => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    console.log(data);
    const payload = {
      courseId: Number(data.courseId)
    };
    console.log(payload);
    const response = await http.patch(`/course/couple-registration/${id}/accept`, payload);
    return response.data;
  } catch (error) {
    console.error('Error accepting registration:', error);
  }
};

export const fetchTotalCourse = async () => {
  try {
    setBearerToken(localStorage.getItem('access_token'));
    const response = await http.get(`/course/total`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioner:', error);
  }
};

export const fetchTotalCouple = async () => {
  try {
    setBearerToken(localStorage.getItem('access_token'));
    const response = await http.get(`/course/couple-registration/total`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioner:', error);
  }
};
