import * as R from 'ramda';
import { createSelector } from 'reselect';

/**
 * cartsSelector
 * Simply return the carts module from the redux store
 * @param {object} state
 * @return {object} module state
 */
export const cartsSelector = R.prop('carts');

export const cartsListSelector = createSelector(
  cartsSelector,
  R.prop('list')
);

export const cartsIsLoadingSelector = createSelector(
  cartsSelector,
  R.prop('isLoading')
);

export const cartsIsReadySelector = createSelector(
  cartsSelector,
  ({ isLoaded, isLoading }) => isLoaded && !isLoading
);
