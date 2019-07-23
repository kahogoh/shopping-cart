import * as R from 'ramda';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

/**
 * wrapWithModule
 * create unique reducer action name by combine moduleName and actionName
 *  @param {string} moduleName
 *  @param {string} actionName
 *  @return {string} moduleName/actionName
 */
export const wrapWithModule = R.curry((moduleName, actionName) =>
  R.join('/', [moduleName, actionName])
);

/**
 * configureStore
 * Configure redux store by providing rootReducers and rootSagas
 * @param {object} options
 * @param {reducers} options.rootReducer
 * @param {sagas} options.rootSaga
 * @param {sagas} options.initialState
 * @param {sagas} options.isSupportDevtool
 * @return {object} store
 */
export const configureStore = options => {
  const { rootReducer, rootSaga, isSupportDevtool = true } = options;

  const composeEnhancers = isSupportDevtool
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

  const sagaMiddleware = createSagaMiddleware();

  const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, middleware);

  sagaMiddleware.run(rootSaga);

  return store;
};
