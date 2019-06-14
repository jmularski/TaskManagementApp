import axios from 'axios';

const request = async (options) => {
  const BASE_URL = 'https://c8538a71.ngrok.io';

  const headers = {
    'Content-Type': 'application/json',
  };

  if (options.authHeader) {
    headers.Authorization = `JWT ${options.authHeader}`;
  }

  if(options.customContentType) {
    headers['Content-Type'] = options.customContentType;
  }

  const client = axios.create({
    baseURL: BASE_URL,
    headers,
  });

  return client(options);
};

export default request;
