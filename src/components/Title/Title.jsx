import React from 'react';
import styled from 'styled-components';

const TitleStyle = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #000;
  text-align:left;
  h2 {
    font-size: 20px;
    margin: 0;
  }
`

function Title({titleName = ''}) {
  return (
    <TitleStyle>
      <h2>{titleName}</h2>
    </TitleStyle>
  );
}

export default Title;
