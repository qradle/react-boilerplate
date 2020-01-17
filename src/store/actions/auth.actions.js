import API_METHODS from 'config/api-methods';

export const AUTH_ACTION_TYPES = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_UPDATE_TOKENS: 'AUTH_UPDATE_TOKENS',
  AUTH_UPDATE_AUTH_INFO: 'AUTH_UPDATE_AUTH_INFO',
  AUTH_CHANGE_PROCESSING: 'AUTH_CHANGE_PROCESSING',
};

export function login(body) {
  return async (dispatch, getState, getAxios) => {
    const axios = getAxios();
    const response = await axios.post(API_METHODS.AUTH_LOGIN, body);

    if (!response || response.code !== 'success') {
      return response;
    }
    const { data } = response;

    dispatch({
      type: AUTH_ACTION_TYPES.AUTH_LOGIN,
      payload: {
        ...data,
      },
    });

    return response;
  };
}

export function logout() {
  return async (dispatch) => {
    return dispatch({
      type: AUTH_ACTION_TYPES.AUTH_LOGOUT,
    });
  };
}

export function updateTokens(newTokensInfo) {
  return async (dispatch) => {
    return dispatch({
      type: AUTH_ACTION_TYPES.AUTH_UPDATE_TOKENS,
      payload: newTokensInfo,
    });
  };
}

export function changeAuthProcessingState(newState) {
  return {
    type: AUTH_ACTION_TYPES.AUTH_CHANGE_PROCESSING,
    payload: newState,
  };
}
