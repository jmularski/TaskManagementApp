import axios from 'axios';

const request = async (options) => {
  const BASE_URL = 'https://20ea5e9b.ngrok.io';

  let headers = {
    'Content-Type': 'application/json',
  };

  let authHeader = null;
  if (options.authHeader) {
    authHeader = options.authHeader;
    headers.Authorization = "JWT " + authHeader;
  }

  const client = axios.create({
    baseURL: BASE_URL,
    headers
  });

  return client(options);
};

export default request;
