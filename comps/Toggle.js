import React from 'react';
import styled from 'styled-components';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 50px;
`;

const Toggle = ({ toggleTheme, theme }) => {
  return (
    <IconContainer>
      <FontAwesomeIcon
        style={{ width: 30, height: 30 }}
        icon={theme === 'light' ? faMoon : faSun}
        onClick={toggleTheme}
      />
    </IconContainer>
  );
};

export default Toggle;
