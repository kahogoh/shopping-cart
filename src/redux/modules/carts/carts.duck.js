import * as R from 'ramda';
import { createAction } from 'redux-actions';

import { wrapWithModule } from 'src/redux/utils';

/*********************
 *   INITIAL STATE   *
 *********************/

const initialState = {
  list: [],
  isLoaded: false,
  isLoading: false
};

/***************
 *   ACTIONS   *
 ***************/

// Create unique action name with header of module namespace
const wrapWithNamespace = wrapWithModule('modules/carts');
// Actions that will wrap with unique module name
export const INIT_CARTS = wrapWithNamespace('INIT_CARTS');
export const UPDATE_CARTS = wrapWithNamespace('UPDATE_CARTS');
export const ADD_TO_CARTS = wrapWithNamespace('ADD_TO_CARTS');
export const REMOVE_FROM_CARTS = wrapWithNamespace('REMOVE_FROM_CARTS');

export const initCarts = createAction(INIT_CARTS);
export const updateCarts = createAction(UPDATE_CARTS);
export const addToCarts = createAction(ADD_TO_CARTS);
export const removeFromCarts = createAction(REMOVE_FROM_CARTS);

/***************
 *   REDUCER   *
 ***************/

export default (state = initialState, action) => {
  const { type, payload } = action;

  const reducer = {
    [INIT_CARTS]: R.mergeLeft({ isLoading: true }),
    [UPDATE_CARTS]: R.mergeLeft({
      list: payload,
      isLoading: false,
      isLoaded: true
    })
  }[type];

  return reducer ? reducer(state, payload) : state;
};
