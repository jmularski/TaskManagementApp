import { APP_URL, APP_ID } from 'react-native-dotenv';
import request from '../helpers/api-handler';

function login({ email, password }) {
  console.log(APP_URL, APP_ID);
  return request({
    custom_base_url: `https://${APP_URL}`,
    url: '/oauth/token',
    method: 'POST',
    data: {
      client_id: APP_ID,
      username: email,
      password,
      realm: 'Username-Password-Authentication',
      audience: 'https://db_test',
      grant_type: 'password',
      scope: 'read:sample',
    },
  }, false);
}

function register({ email, password }) {
  console.log(APP_URL, APP_ID);
  return request({
    custom_base_url: `https://${APP_URL}`,
    url: '/dbconnections/signup',
    method: 'POST',
    data: {
      client_id: APP_ID,
      email,
      password,
      scope: 'read:sample',
      connection: 'Username-Password-Authentication',
    },
  }, false);
}

const AuthService = {
  login, register,
};

export default AuthService;
