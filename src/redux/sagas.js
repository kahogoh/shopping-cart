import { fork, all } from 'redux-saga/effects';

import productsSaga from './modules/products/products.saga';
import cartsSaga from './modules/carts/carts.saga';

const effects = [fork(productsSaga), fork(cartsSaga)];

export function* rootSaga() {
  yield all(effects);
}

export default rootSaga;
