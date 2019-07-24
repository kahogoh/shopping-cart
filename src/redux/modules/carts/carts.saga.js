import * as R from 'ramda';
import { takeLatest, put, call, all, select } from 'redux-saga/effects';

import * as apiCalls from './carts.api';
import * as actions from './carts.duck';
import * as selectors from 'src/redux/selectors';

const findCartById = id => R.find(R.propEq('id', id));
const hasCartById = id =>
  R.pipe(
    findCartById(id),
    R.complement(R.isNil)
  );

function* initCartsSaga() {
  try {
    const myCarts = yield call(apiCalls.getMyCarts);

    yield put(actions.updateCarts(myCarts));
  } catch (e) {}
}

function* addCartsSaga({ payload: id }) {
  try {
    const myCarts = yield select(selectors.cartsListSelector);
    const newCarts = R.ifElse(
      hasCartById(id),
      R.map(
        R.when(R.propEq('id', id), cart => ({ ...cart, qty: R.inc(cart.qty) }))
      ),
      R.append({ id, qty: 1 })
    )(myCarts);

    yield call(apiCalls.saveMyCarts, newCarts);
    yield put(actions.updateCarts(newCarts));
  } catch (e) {}
}

function* removeCartsSaga({ payload: id }) {
  try {
    const myCarts = yield select(selectors.cartsListSelector);
    const updatedCarts = R.reject(R.propEq('id', id))(myCarts);

    yield call(apiCalls.saveMyCarts, updatedCarts);
    yield put(actions.updateCarts(updatedCarts));
  } catch (e) {}
}

export default function*() {
  yield all([
    takeLatest(actions.initCarts, initCartsSaga),
    takeLatest(actions.addToCarts, addCartsSaga),
    takeLatest(actions.removeFromCarts, removeCartsSaga)
  ]);
}
