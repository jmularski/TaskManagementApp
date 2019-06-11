import axios from 'axios';

const request = async (options) => {
  let BASE_URL = 'https://74aef9e9.ngrok.io';

  let authHeader = null;
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
