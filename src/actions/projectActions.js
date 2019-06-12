import { projectActions } from '../types';

export const addProject = (payload) => ({
  type: projectActions.ADD_PROJECT,
  payload
});

export const addProjectSuccess = (payload) => ({
  type: projectActions.ADD_PROJECT_SUCCESS,
  payload
});

export const addProjectFailure = (payload) => ({
  type: projectActions.ADD_PROJECT_FAILURE,
  payload
});

export const getProjects = () => ({
  type: projectActions.GET_PROJECTS,
});

export const getProjectsSuccess = (payload) => ({
  type: projectActions.GET_PROJECTS_SUCCESS,
  payload
});

export const getProjectsFailure = (payload) => ({
  type: projectActions.GET_PROJECTS_FAILURE,
  payload
});