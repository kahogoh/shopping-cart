import React from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

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
    icon: 'shopping-cart'
  }
];

const getSelectedKeys = pathname =>
  R.pipe(
    R.find(R.propEq('route', pathname)),
    R.propOr(NAV_ITEMS[0].key, 'key')
  )(NAV_ITEMS);

const renderNavItem = ({ key, name, route, icon }) => (
  <Styled.NavItem key={key}>
    <Icon type={icon} />
    <>{name}</>
    <Link to={route} />
  </Styled.NavItem>
);

const CoreLayout = ({ children, location: { pathname } }) => (
  <Styled.Wrapper>
    <Styled.Header>
      <Styled.Logo>Shopping Cart</Styled.Logo>
      <Styled.Nav selectedKeys={getSelectedKeys(pathname)}>
        {NAV_ITEMS.map(renderNavItem)}
      </Styled.Nav>
    </Styled.Header>
    <Styled.Content>{children}</Styled.Content>
    <Styled.Footer>Work by Wayne Goh</Styled.Footer>
  </Styled.Wrapper>
);

export default withRouter(CoreLayout);
