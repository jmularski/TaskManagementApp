import { userActions } from '../types';

const initialState = {
  isFetching: false,
  isSelfAccount: false,
  userData: {
    email: '',
    first_name: '',
    last_name: '',
    profile_img: null,
    settings: {
      email_notifications_on_events: true,
    },
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.GET_SELF_INFO:
      return {
        ...state,
        isFetching: true,
        isSelfAccount: true,
      };
    case userActions.GET_SELF_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userData: {
          ...state.userData,
          email: action.payload.email,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          profile_img: action.payload.profile_img,
          settings: {
            ...state.userData.settings,
            email_notifications_on_events: action.payload.settings.email_notifications_on_events,
          },
        },
      };
    case userActions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    case userActions.UPDATE_IMAGE_SUCCESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          profile_img: payload.profile_img
        }
      }
    case userActions.REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        isSelfAccount: false,
      };
    default:
      return state;
  }
}

export default userReducer;
