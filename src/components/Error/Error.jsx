import React from 'react';
import styled from 'styled-components';

const ErrorStyle = styled.div`
  width: 100%;
  padding: 5px 0;
  margin: auto;
  border: 1px solid #ECA5A5;
  background-color: #F8E5E5;
`

function Error({errorMsg = ''}) {
  return (
    <ErrorStyle>
     {errorMsg}
    </ErrorStyle>
  );
}

export default Error;
