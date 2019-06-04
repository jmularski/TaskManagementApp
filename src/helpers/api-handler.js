import axios from 'axios';
import { AsyncStorage } from 'react-native';


const request = async (options, addAuthHeader = true) => {
  let BASE_URL = 'https://ec754389.ngrok.io';

  if (options.custom_base_url) {
    BASE_URL = options.custom_base_url;
  }

  let authHeader = null;
  if (addAuthHeader) {
    authHeader = await AsyncStorage.getItem('Auth');
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
