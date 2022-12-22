import React from 'react';
import styled from 'styled-components';
import Loading from '../Loading';

const DetailStyled = styled.div`
  &.history {
    li {
      display: flex;
      align-items: center;
      justify-content:space-between;
      .rightBox {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          margin-left: 10px;
          border-radius: 5px;
          border: 1px solid #000;
          padding: 0 5px;
          cursor: pointer;
          &:active {
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }
  &.detail {
    padding: 20px ${({isSuccess}) => isSuccess ? '30': '0'}px;
    text-align: ${({isSuccess}) => isSuccess ? 'left': 'center'};
    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      label {
        max-width:100px;
        width: 100%;
        margin-right: 10px;
        color: #666;
      }
    }
    .clouds {
      padding: 5px 0;
      font-size: 24px;
      font-weight: bold;
    }
  }
  ul {
    margin:0;
    padding: 0;
    li {
      list-style: none;
      padding:5px 0;
    }
  }
`

function Detail({children, className = 'detail', isSuccess = true, isLoading = false}) {

  if(isLoading) return (<Loading />)

  return (
    <DetailStyled className={className} isSuccess={isSuccess}>
      {children}
    </DetailStyled>
  );
}

export default Detail;
