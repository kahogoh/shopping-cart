import { fork, all } from 'redux-saga/effects';

import productsSaga from './modules/products/products.saga';

const effects = [fork(productsSaga)];

export function* rootSaga() {
  yield all(effects);
}

export default rootSaga;
