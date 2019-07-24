import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as selectors from './redux/selectors';
import { getProducts } from './redux/modules/products/products.duck';
import { initCarts } from './redux/modules/carts/carts.duck';
import CoreLayout from './components/coreLayout';
import Product from './pages/product';
import Cart from './pages/cart';

/***************
 *   HELPERS   *
 ***************/

/**
 * setupApp - Initial setup once app is loaded
 * @param {object} props provided by mapStateToProps & mapDispatchToProps
 * @property {object} props.actions provided by mapDispatchToProps
 * @property {boolean} props.isProductsReady should be true once data loaded from products api
 */
const setupApp = ({ isProductsReady, isCartsReady, actions }) => () => {
  if (!isProductsReady) {
    actions.getProducts();
  }
  if (!isCartsReady) {
    actions.initCarts();
  }
};

/*****************
 *   COMPONENT   *
 *****************/

const App = ({ setupApp }) => {
  useEffect(() => {
    setupApp();
  }, []);

  return (
    <Router>
      <CoreLayout>
        <Route path="/" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
      </CoreLayout>
    </Router>
  );
};

/*************
 *   REDUX   *
 *************/

const mapStateToProps = state => ({
  isLoading: selectors.productsIsLoadingSelector(state),
  isProductsReady: selectors.productsIsReadySelector(state),
  isCartsReady: selectors.cartsIsReadySelector(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getProducts,
      initCarts
    },
    dispatch
  )
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  withHandlers({
    setupApp
  })
)(App);
