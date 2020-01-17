import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { getAxios } from 'utils/api/axiosClient';
//
import { writeToLocalState } from 'utils/localStorage';
import rootReducer from './reducers/root';
import { USER_INFO } from './reducers/auth.reducer';

const getUserInfo = ({ authState }) => authState[USER_INFO];

export function configureStore(initialState = {}) {
  const middleware = [thunk.withExtraArgument(getAxios)];

  let composeEnhancers = compose;
  if (
    process.env.NODE_ENV === 'development' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line
  }

  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers/root', () => {
      const nextReducer = require('./reducers/root').default;
      store.replaceReducer(nextReducer);
    });
  }

  store.subscribe(() => writeToLocalState(USER_INFO, getUserInfo(store.getState())));

  return store;
}
