import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const getPrograms = async () => {
  const res = await axios.get(`${API_BASE_URL}/programs`, {
    headers: {
      'X-API-KEY': '1234567890abcdef',
    },
  });
  return res.data.data;
};
