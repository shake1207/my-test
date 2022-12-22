import styled from 'styled-components';

const ButtonStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 5px;
  border:1px solid #000;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 10px;
  }
  &:active {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
  @media( max-width:880px){
    margin-top: 10px;
    min-width: 100px;
  }
`;

const Button = ({name = 'button', onClickFc = () => {}}) => (
  <ButtonStyled className="button" onClick={onClickFc}>{name}</ButtonStyled>
);

export default Button;
