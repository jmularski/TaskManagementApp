import request from "src/helpers/api-handler";

function getSelfData(token) {
  return request({
    url: "/user/",
    method: "GET",
    authHeader: token
  });
}

function getUserData(token, query) {
  return request({
    url: `/user/search/?query=${query}`,
    method: "GET",
    authHeader: token
  });
}

function updateUser(payload, token) {
  return request({
    url: "/user/",
    method: "PATCH",
    authHeader: token,
    data: {
      ...payload
    }
  });
}

function updateImage(image, token) {
  return request({
    url: "/user/upload_image/",
    method: "POST",
    authHeader: token,
    customContentType: "multipart/form-data",
    data: {
      profile_image: image
    }
  });
}

export default {
  getSelfData,
  getUserData,
  updateUser,
  updateImage
};
