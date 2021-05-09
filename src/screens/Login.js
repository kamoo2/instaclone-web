import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import routes from "../routes";

const FaceBookLogin = styled.div`
  margin-bottom: 20px;
  color: #385285;
  span {
    font-weight: 600;
    margin-left: 10px;
  }
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const onUsernameChange = (e) => {
    setUsernameError("");
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    if (username === "") {
      setUsernameError("Not empty pls.");
    }
    if (username.length < 10) {
      setUsernameError("too short");
    }
  };
  return (
    <AuthLayout>
      <FormBox>
        <FontAwesomeIcon icon={faInstagram} size="3x" />
        <form onSubmit={handleSubmit}>
          {usernameError}
          <Input
            onChange={onUsernameChange}
            value={username}
            type="text"
            placeholder="사용자 이름"
          />
          <Input type="password" placeholder="비밀번호" />
          <Button
            disabled={username === "" || username.length < 10}
            type="submit"
            value="로그인"
          />
        </form>
        <Separator />
        <FaceBookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebook으로 로그인</span>
        </FaceBookLogin>
        <span>비밀번호를 잊으셨나요?</span>
      </FormBox>
      <BottomBox
        cta="계정이 없으신가요 ?"
        link={routes.signUp}
        linkText="가입하기"
      />
    </AuthLayout>
  );
};
export default Login;
