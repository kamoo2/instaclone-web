import styled, { css } from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Container = styled.div``;

const Title = styled.h1``;

const DarkModeBtn = styled.button`
  color: red;
`;

const LightModeBtn = styled.button`
  color: blue;
`;

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => isLoggedInVar(true)}>로그인</button>
      <DarkModeBtn onClick={() => darkModeVar(true)}>To Dark</DarkModeBtn>
      <LightModeBtn onClick={() => darkModeVar(false)}>To Light</LightModeBtn>
    </Container>
  );
};
export default Login;
