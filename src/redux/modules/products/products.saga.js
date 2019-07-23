import { takeLatest, put, call, all } from 'redux-saga/effects';

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
  yield all([takeLatest(actions.getProducts, getProductsSaga)]);
}
