import React from 'react';
import { Table, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import * as selectors from 'src/redux/selectors';

/******************
 *   COMPONENTS   *
 ******************/

const Product = ({ isLoading, columns, list }) => (
  <>
    <h1>Products</h1>
    <Table columns={columns} loading={isLoading} dataSource={list} />
  </>
);

/*************
 *   REDUX   *
 *************/

const mapStateToProps = state => ({
  isLoading: selectors.productsIsLoadingSelector(state),
  list: selectors.productsListSelector(state)
});

const mapDispatchToProps = dispatch => ({
  // bindActionCreators(
  actions: {
    // TODO: Add product to cart
    addToCart: id => console.log('Clicked', id)
  } // ,
  //dispatch
  //   )
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withProps(({ actions }) => ({
    columns: [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: 'Name',
        width: 300,
        dataIndex: 'name'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        align: 'right'
      },
      {
        title: '',
        key: 'addToCart',
        render: ({ id }) => (
          <Button onClick={() => actions.addToCart(id)}>Add to cart</Button>
        )
      }
    ]
  }))
)(Product);
