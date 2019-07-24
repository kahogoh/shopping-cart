import * as R from 'ramda';
import { createSelector } from 'reselect';

import { productsListSelector } from './products';

/**
 * cartsSelector
 * Simply return the carts module from the redux store
 * @param {object} state
 * @return {object} module state
 */
export const cartsSelector = R.prop('carts');

export const cartsListSelector = createSelector(
  cartsSelector,
  R.propOr([], 'list')
);

export const cartsDisplayListSelector = createSelector(
  productsListSelector,
  cartsListSelector,
  (products, carts) =>
    carts.map(({ id, qty }) => {
      const { name = '', price = 0 } =
        R.find(R.propEq('id', id), products) || {};
      return {
        id,
        name,
        qty,
        total: price * qty
      };
    })
);

export const cartsTotalCostSelector = createSelector(
  cartsDisplayListSelector,
  R.pipe(
    R.map(R.prop('total')),
    R.sum
  )
);
export const cartsCountSelector = createSelector(
  cartsListSelector,
  R.length
);

export const cartsIsLoadingSelector = createSelector(
  cartsSelector,
  R.prop('isLoading')
);

export const cartsIsReadySelector = createSelector(
  cartsSelector,
  ({ isLoaded, isLoading }) => isLoaded && !isLoading
);
