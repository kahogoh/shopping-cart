import * as R from 'ramda';
import { createAction } from 'redux-actions';

import { wrapWithModule } from 'src/redux/utils';

/*********************
 *   INITIAL STATE   *
 *********************/

const initialState = {
  list: [],
  isLoading: false,
  hasError: false
};

/***************
 *   ACTIONS   *
 ***************/

// Create unique action name with header of module namespace
const wrapWithNamespace = wrapWithModule('modules/products');
// Actions that will wrap with unique module name
export const GET_PRODUCTS = wrapWithNamespace('GET_PRODUCTS');
export const GET_PRODUCTS_SUCCESS = wrapWithNamespace('GET_PRODUCTS_SUCCESS');
export const GET_PRODUCTS_FAILURE = wrapWithNamespace('GET_PRODUCTS_FAILURE');

export const getProducts = createAction(GET_PRODUCTS);
export const getProductsSuccess = createAction(GET_PRODUCTS_SUCCESS);
export const getProductsFailure = createAction(GET_PRODUCTS_FAILURE);

/***************
 *   REDUCER   *
 ***************/

export default (state = initialState, action) => {
  const { type, payload } = action;

  const reducer = {
    [GET_PRODUCTS]: R.mergeLeft({ isLoading: true }),
    [GET_PRODUCTS_SUCCESS]: R.mergeLeft({ list: payload, isLoading: false }),
    [GET_PRODUCTS_FAILURE]: R.mergeLeft({ isLoading: false, hasError: true })
  }[type];

  return reducer ? reducer(state, payload) : state;
};
