import { forwardRef } from 'react';
import styled from 'styled-components';

const InputBoxStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 25%;
  width: 100%;
  margin-right: 20px;
  input {
    width: 100%;
    padding: 5px 0;
    margin-left: 5px;
  }
  @media( max-width:880px){
    max-width: 100%;
    margin: 5px 0; 
    label {
      max-width: 80px;
      width: 100%;
    }
  }
`;

const InputBox = forwardRef(({
  labelName = '', 
  type = 'text', 
}, ref) => (
    <InputBoxStyled>
      <label>{labelName}:</label>
      <input type={type} ref={ref} />
    </InputBoxStyled>
  )
);

export default InputBox;
