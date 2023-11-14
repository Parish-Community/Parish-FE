import http from '@/utils/http-common.ts';

export const fetchParishioners = async () => {
  try {
    const response = await http.get('/parishioner');
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioners:', error);
  }
};

export const fetchParishionerWithMonk = async () => {
  try {
    const response = await http.get(`parishioner/monks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parishioner:', error);
  }
};
