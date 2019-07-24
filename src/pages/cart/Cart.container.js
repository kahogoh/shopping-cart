import React from 'react';
import { Table, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';

import * as selectors from 'src/redux/selectors';
import { formatCurrency } from 'src/utils';
import { removeFromCarts } from 'src/redux/modules/carts/carts.duck';

/******************
 *   COMPONENTS   *
 ******************/

const Cart = ({ isLoading, columns, list, totalCost }) => (
  <>
    <h1>My Carts</h1>
    <h3>Total: ${formatCurrency(totalCost)} </h3>
    <Table rowKey="id" columns={columns} dataSource={list} />
  </>
);

/*************
 *   REDUX   *
 *************/

const mapStateToProps = state => ({
  list: selectors.cartsDisplayListSelector(state),
  totalCost: selectors.cartsTotalCostSelector(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      removeFromCarts
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
        title: 'Quantity',
        dataIndex: 'qty',
        align: 'center'
      },
      {
        title: 'Total Price',
        dataIndex: 'total',
        align: 'right',
        render: text => `$${formatCurrency(text)}`
      },
      {
        title: '',
        key: 'removeFromCarts',
        render: props => (
          <Button onClick={() => actions.removeFromCarts(props)}>Remove</Button>
        )
      }
    ]
  }))
)(Cart);
