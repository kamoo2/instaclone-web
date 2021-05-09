import styled from "styled-components";

const SSeparator = styled.div`
  margin: 20px 0 30px 0;
  width: 100%;
  margin-top: 10px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-size: 12px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

function Separator() {
  return (
    <SSeparator>
      <div></div>
      <span>or</span>
      <div></div>
    </SSeparator>
  );
}

export default Separator;
