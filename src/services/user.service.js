import request from '../helpers/api-handler';

function getSelfData(token) {
  return request({
    url: '/user/',
    method: 'GET',
    authHeader: token,
  });
}

function updateUser(payload, token) {
  return request({
    url: '/user/',
    method: 'PATCH',
    authHeader: token,
    data: {
      ...payload,
    },
  });
}

export default {
  getSelfData,
  updateUser,
};
