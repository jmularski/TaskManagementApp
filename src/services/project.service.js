import request from '../helpers/api-handler';

function addProject({ title, description, token }) {
  return request(
    {
      url: '/projects/project/',
      method: 'POST',
      authHeader: token,
      data: {
        project_name: title,
        description,
      },
    },
  );
};

function getProject(token) {
  return request(
    {
      url: '/projects/project/',
      method: 'GET',
      authHeader: token,
    },
  );
};

export default {
  addProject,
  getProject,
};