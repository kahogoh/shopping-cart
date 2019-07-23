import { takeLatest, put, call, all, fork } from 'redux-saga/effects';

import * as apiCalls from './products.api';
import * as actions from './products.duck';

function* getProductsSaga() {
  try {
    const productList = yield call(apiCalls.getProductsList);

    yield put(actions.getProductsSuccess(productList));
  } catch (e) {
    yield put(actions.getProductsFailure(e));
  }
}

export default function*() {
  yield all([fork(takeLatest, actions.getProducts, getProductsSaga)]);
}
