import { combineReducers } from 'redux';
// reducers
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth.reducer';
import modalReducer from './modal.reducer';

/*
 * Creates the main reducer with the dynamically injected ones
 * @param {object} injectedReducers - list of reducers
 * @returns {Reducer<any> | Reducer<any, AnyAction>}
 */

const appReducer = combineReducers({
  form: formReducer,
  authState: authReducer,
  modalState: modalReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'GLOBAL_CLEAR_STATE') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
