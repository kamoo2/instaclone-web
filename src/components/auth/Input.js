import styled from "styled-components";

const SInput = styled.input`
  width: 100%;
  padding: 10px 7px;
  border-radius: 3px;
  margin-top: 5px;
  background-color: rgb(250, 250, 250);
  border: 0.5px solid ${(props) => props.theme.borderColor};
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

function Input(props) {
  return <SInput {...props} />;
}

export default Input;
