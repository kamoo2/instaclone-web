import { useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory(); // mutation이 성공했을 때 페이지 전환을 위해

  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    console.log(data);
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
      return;
    }
    const { username, password } = getValues();
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    }); // "/"로 이동
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  // const { firstName, lastName, email, username, password } = getValues();

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: {
        ...data,
      },
    });
  };

  const clearSignUpError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="SignUp" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "이름을 입력해주세요.",
            })}
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={clearSignUpError}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            ref={register}
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={clearSignUpError}
          />
          <Input
            ref={register({
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                message: "이메일 형식에 맞는 값을 입력하세요.",
              },
            })}
            name="email"
            type="text"
            placeholder="Email"
            onChange={clearSignUpError}
          />
          <FormError message={errors?.email?.message} />
          <Input
            ref={register({
              required: "사용자 이름을 입력해주세요.",
              minLength: {
                value: 5,
                message: "5글자 이상의 사용자 이름을 입력해주세요.",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            onChange={clearSignUpError}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "패스워드를 입력해주세요.",
              pattern: {
                value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                message:
                  "숫자,문자,특수문자를 포함한 8~15의 패스워드를 입력해주세요.",
              },
            })}
            name="password"
            type="password"
            placeholder="Password"
            onChange={clearSignUpError}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "회원가입"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
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
