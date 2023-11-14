import http, { setBearerToken } from '@/utils/http-common.ts';

export const fetchCoupleRegistration = async () => {
  await setBearerToken(localStorage.getItem('access_token'));
  return http
    .get('/course/couple-registration')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching parishioners:', error);
    });
};

export const fetchCourses = async () => {
  await setBearerToken(localStorage.getItem('access_token'));
  return http
    .get(`/course`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching course:', error);
    });
};
