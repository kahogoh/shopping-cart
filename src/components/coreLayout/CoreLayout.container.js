import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon, Badge } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import * as selectors from 'src/redux/selectors';
import * as Styled from './coreLayout.styled';

const NAV_ITEMS = [
  {
    key: 'home',
    name: 'Home',
    route: '/',
    icon: 'appstore'
  },
  {
    key: 'cart',
    name: 'Cart',
    route: '/cart',
    badge: 'cartCount',
    icon: 'shopping-cart'
  }
];

const getSelectedKeys = pathname =>
  R.pipe(
    R.find(R.propEq('route', pathname)),
    R.prop('key'),
    R.append(R.__, [])
  )(NAV_ITEMS);

const renderNavItem = badgeProps => ({ key, name, route, icon, badge }) => (
  <Styled.NavItem key={key}>
    {badge && R.has(badge, badgeProps) ? (
      <Badge offset={[10, -5]} count={badgeProps[badge]}>
        <Icon type={icon} />
        <>{name}</>
      </Badge>
    ) : (
      <>
        <Icon type={icon} />
        <>{name}</>
      </>
    )}
    <Link to={route} />
  </Styled.NavItem>
);

const CoreLayout = ({ children, cartCount, location: { pathname } }) => (
  <Styled.Wrapper>
    <Styled.Header>
      <Styled.Logo>Shopping Cart</Styled.Logo>
      <Styled.Nav selectedKeys={getSelectedKeys(pathname)}>
        {NAV_ITEMS.map(renderNavItem({ cartCount }))}
      </Styled.Nav>
    </Styled.Header>
    <Styled.Content>{children}</Styled.Content>
    <Styled.Footer>Work by Wayne Goh</Styled.Footer>
  </Styled.Wrapper>
);

/*************
 *   REDUX   *
 *************/

const mapStateToProps = state => ({
  cartCount: selectors.cartsCountSelector(state)
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(CoreLayout);
