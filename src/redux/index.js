import { rootReducer } from './reducers';
import { rootSaga } from './sagas';
import { configureStore } from './utils';

export const setupStore = () => configureStore({ rootReducer, rootSaga });
