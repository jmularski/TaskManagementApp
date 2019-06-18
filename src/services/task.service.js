import request from '../helpers/api-handler';

function addTask(token, projectId, payload) {
  return request({
    url: `/projects/project_tasks/${projectId}/tasks/`,
    method: 'POST',
    authHeader: token,
    data: {
      name: payload.name,
      description: payload.description,
    },
  });
}

function getTasks(token, projectId) {
  return request({
    url: `/projects/project_tasks/${projectId}/tasks/`,
    method: 'GET',
    authHeader: token,
  });
}

export default {
  addTask,
  getTasks,
};
