import http, { setBearerToken } from '@/utils/http-common.ts';

export const fetchDonations = async (page?: number, searchText?: string) => {
  setBearerToken(localStorage.getItem('access_token'));
  const queryParams = searchText ? `?page=${page}&searchText=${searchText}` : `?page=${page}`;
  try {
    const response = await http.get(`/payments/donations${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching donations:', error);
  }
};

export const fetchDonation = async () => {
  setBearerToken(localStorage.getItem('access_token'));
  try {
    const response = await http.get(`/payments/total`);
    return response.data;
  } catch (error) {
    console.error('Error fetching donation:', error);
  }
};
