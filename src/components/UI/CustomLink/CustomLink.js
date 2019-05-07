import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ color }) =>
    color === 'white' ? 'var(--color-white)' : 'var(--color-main'};
  font-weight: 700;
  padding: 1rem 2rem;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const CustomLink = ({ link, color, children }) => {
  return (
    <StyledLink to={link} color={color}>
      {children}
    </StyledLink>
  );
};

export default CustomLink;
