import request from '../helpers/api-handler';

function login({ email, password }) {
  return request(
    {
      url: '/api-token-auth/',
      method: 'POST',
      data: {
        email,
        password,
      },
    },
  );
}

function register({ email, fullName, password }) {
  fullName = fullName.split(' ');
  return request(
    {
      url: '/user/',
      method: 'POST',
      data: {
        email,
        first_name: fullName[0],
        last_name: fullName[1],
        password,
      },
    },
  );
}

export default {
  login,
  register,
};
