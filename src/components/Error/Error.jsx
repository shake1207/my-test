import styled from 'styled-components';

const ErrorStyle = styled.div`
  width: 100%;
  margin: auto;
  padding: 5px 0;
  border: 1px solid #ECA5A5;
  background-color: #F8E5E5;
`;

const Error = ({errorMsg = ''}) => (
  <ErrorStyle>{errorMsg}</ErrorStyle>
);

export default Error;
