import React,{useRef,forwardRef} from 'react';
import styled from 'styled-components';

const InputBoxStyled = styled.div`
  max-width:25%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px;
  input {
    width: 100%;
    padding: 5px 0;
    margin-left: 5px;
  }
`
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
