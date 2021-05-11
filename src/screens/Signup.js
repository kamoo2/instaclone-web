import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 19px;
  text-align: center;
  margin-top: 20px;
`;

const SignUp = () => {
  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="username" />
          <Input type="text" placeholder="firstname" />
          <Input type="text" placeholder="lastname" />
          <Input type="password" placeholder="password" />
          <Button type="submit" value="가입" />
        </form>
      </FormBox>
      <BottomBox
        cta="계정이 있으신가요 ?"
        link={routes.home}
        linkText="로그인"
      />
    </AuthLayout>
  );
};

export default SignUp;
