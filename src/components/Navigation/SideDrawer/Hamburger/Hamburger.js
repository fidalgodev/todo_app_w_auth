import React from 'react';
import styled from 'styled-components';

const StyledHamb = styled.div`
  width: 30px;
  height: 22.5px;
  padding: 1rem;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  cursor: pointer;

  & span {
    display: block;
    position: absolute;
    height: 4.5px;
    width: 100%;
    background: var(--color-white);
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
      top: ${props => (props.opened ? '9px' : '0px')};
      width: ${props => (props.opened ? '0%' : '100%')};
      left: ${props => (props.opened ? '50%' : null)};
    }

    &:nth-child(2) {
      transform: ${props => (props.opened ? 'rotate(45deg)' : null)};
    }

    &:nth-child(3) {
      transform: ${props => (props.opened ? 'rotate(-45deg)' : null)};
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: 9px;
    }

    &:nth-child(4) {
      top: ${props => (props.opened ? '9px' : '18px')};
      width: ${props => (props.opened ? '0%' : '100%')};
      left: ${props => (props.opened ? '50%' : null)};
    }
  }
`;

const Hamburger = ({ opened, clicked }) => {
  return (
    <StyledHamb onClick={clicked} opened={opened}>
      <span />
      <span />
      <span />
      <span />
    </StyledHamb>
  );
};

export default Hamburger;
