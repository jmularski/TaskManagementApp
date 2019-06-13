import axios from 'axios';

const request = async (options) => {
  const BASE_URL = 'https://f2218e12.ngrok.io';

  const headers = {
    'Content-Type': 'application/json',
  };

  let authHeader = null;
  if (options.authHeader) {
    authHeader = options.authHeader;
    headers.Authorization = `JWT ${authHeader}`;
  }

  const client = axios.create({
    baseURL: BASE_URL,
    headers,
  });

  return client(options);
};

export default request;
