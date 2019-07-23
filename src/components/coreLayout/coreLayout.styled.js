import styled, { css } from 'styled-components';
import { Layout, Menu } from 'antd';

const flexFull = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled(Layout)`
  ${flexFull}
  min-height: 100vh;
`;
export const Header = styled(Layout.Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 30px;
`;
export const Content = styled(Layout.Content)`
  ${flexFull}
  align-items: center;
  margin: 0 50px;
`;
export const Footer = styled(Layout.Footer)`
  ${flexCenter}
  padding: 10px 0;
`;

export const Nav = styled(Menu).attrs({
  theme: 'dark',
  mode: 'horizontal'
})`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
`;
export const NavItem = styled(Menu.Item)``;

export const Logo = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: white;
`;
