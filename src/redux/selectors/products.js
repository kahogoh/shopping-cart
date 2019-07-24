import * as R from 'ramda';
import { createSelector } from 'reselect';

import { formatCurrency } from 'src/utils';

export const formatPrice = ({ price, ...rest }) => ({
  ...rest,
  price: `$${formatCurrency(price)}`
});

/**
 * productsSelector
 * Simply return the products module from the redux store
 * @param {object} state
 * @return {object} module state
 */
export const productsSelector = R.prop('products');

export const productsListSelector = createSelector(
  productsSelector,
  R.pipe(
    R.prop('list'),
    R.map(formatPrice)
  )
);

export const productsIsLoadingSelector = createSelector(
  productsSelector,
  R.prop('isLoading')
);

export const productsIsReadySelector = createSelector(
  productsSelector,
  ({ isLoaded, isLoading }) => isLoaded && !isLoading
);
