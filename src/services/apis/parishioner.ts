import http from '@/utils/http-common.ts';

export const fetchParishioners = () => {
  return http
    .get('/parishioner')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching parishioners:', error);
    });
};
