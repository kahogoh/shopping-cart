import * as R from 'ramda';
import { createSelector } from 'reselect';

/**
 * productsSelector
 * Simply return the products module from the redux store
 * @param {object} state
 * @return {object} module state
 */
export const productsSelector = R.prop('products');

export const productsListSelector = createSelector(
  productsSelector,
  R.prop('list')
);

export const productsIsLoadingSelector = createSelector(
  productsSelector,
  R.prop('isLoading')
);

export const productsIsReadySelector = createSelector(
  productsSelector,
  ({ isLoaded, isLoading }) => isLoaded && !isLoading
);
