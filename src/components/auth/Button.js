import styled from "styled-components";

const BButton = styled.input`
  width: 100%;
  border: none;
  border-radius: 5px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0;
  font-weight: 600;
`;

const DisabledButton = styled(BButton)`
  background-color: lightblue;
`;

function Button(props) {
  return props.disabled ? (
    <DisabledButton {...props} />
  ) : (
    <BButton {...props} />
  );
}

export default Button;
