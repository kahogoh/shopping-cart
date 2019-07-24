import React from 'react';
import { Table, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import * as selectors from 'src/redux/selectors';
import { formatCurrency } from 'src/utils';
import { addToCarts } from 'src/redux/modules/carts/carts.duck';

/******************
 *   COMPONENTS   *
 ******************/

const Product = ({ isLoading, columns, list }) => (
  <>
    <h1>Products</h1>
    <Table
      rowKey="id"
      columns={columns}
      loading={isLoading}
      dataSource={list}
    />
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
  actions: bindActionCreators(
    {
      addToCarts
    },
    dispatch
  )
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
        align: 'right',
        render: text => `$${formatCurrency(text)}`
      },
      {
        title: '',
        key: 'addToCart',
        render: props => (
          <Button onClick={() => actions.addToCarts(props)}>Add to cart</Button>
        )
      }
    ]
  }))
)(Product);
