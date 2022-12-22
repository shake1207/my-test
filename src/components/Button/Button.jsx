import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:5px;
  border:1px solid #000;
  &:not(:first-child){
    margin-left: 10px;
  }
`

const Button = ({name = 'button', onClickFc = () => {}}) => {
  return (
    <div className="button" onClick={onClickFc}>{name}</div>
  );
}

export default Button;
