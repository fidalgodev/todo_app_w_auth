import React from 'react';
import styled from 'styled-components';

const P = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ error, success }) => {
    if (error) return 'var(--color-errorRed)';
    if (success) return 'green';
    else return 'var(--color-main)';
  }};
  opacity: ${({ show }) => (show ? '1' : '0')};
  visibility: ${({ show }) => (show ? 'visibile' : 'hidden')};
  text-align: center;
  transition: all 0.2s;
`;

const Message = ({ children, error, success, show }) => {
  return (
    <P error={error} success={success} show={show}>
      {children}
    </P>
  );
};

export default Message;
