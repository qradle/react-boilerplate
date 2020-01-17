import { AUTH_ACTION_TYPES } from 'store/actions/auth.actions';

export const USER_INFO = 'project/auth/USER_INFO';

const initialState = {
  accessToken: '',
  refreshToken: '',
  accessTokenExpire: '',
  isAuthProcessed: false,
};

export default function(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_ACTION_TYPES.AUTH_LOGIN:
      return { ...state, ...payload };

    case AUTH_ACTION_TYPES.AUTH_UPDATE_TOKENS:
      return { ...state, ...payload };

    case AUTH_ACTION_TYPES.AUTH_UPDATE_AUTH_INFO:
      return { ...state, authInfo: { ...payload } };

    case AUTH_ACTION_TYPES.AUTH_CHANGE_PROCESSING:
      return { ...state, isAuthProcessed: payload };

    case AUTH_ACTION_TYPES.AUTH_LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
}
