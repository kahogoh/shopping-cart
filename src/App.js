import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import * as selectors from './redux/selectors';
import { getProducts } from './redux/modules/products/products.duck';

import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
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
