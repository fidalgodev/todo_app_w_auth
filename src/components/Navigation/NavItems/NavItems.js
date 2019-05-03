import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem/NavItem';

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : null)};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const NavItems = ({ mobile, clicked }) => {
  return (
    <Nav mobile={mobile}>
      <Ul mobile={mobile}>
        <NavItem mobile={mobile} clicked={clicked} link="/">
          home
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/todos">
          Todos
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/login">
          Login
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/signup">
          Signup
        </NavItem>
      </Ul>
    </Nav>
  );
};

export default NavItems;
