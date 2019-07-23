import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as selectors from './redux/selectors';
import { getProducts } from './redux/modules/products/products.duck';
import CoreLayout from './components/coreLayout';
import Home from './pages/home';
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
const setupApp = ({ isProductsReady, actions }) => () => {
  if (!isProductsReady) {
    actions.getProducts();
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
        <Route path="/" exact component={Home} />
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
  isProductsReady: selectors.productsIsReadySelector(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      getProducts
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
