import axios from 'axios';

const request = async (options) => {
  let BASE_URL = 'http://localhost:5000';

  if (options.custom_base_url) {
    BASE_URL = options.custom_base_url;
  }

  let authHeader;
  if (options.authHeader) {
    authHeader = options.authHeader;
  }

  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
  });

  return client(options);
};

export default request;
