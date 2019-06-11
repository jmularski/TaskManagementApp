import request from '../helpers/api-handler';

function getSelfData(token) {
  return request({
    url: "/user/",
    method: "GET",
    authHeader: token
  });
}

export default UserService = {
  getSelfData
}