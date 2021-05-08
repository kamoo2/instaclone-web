import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 20px 40px;

  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    input {
      width: 100%;
      padding: 10px 7px;
      border-radius: 3px;
      margin-top: 5px;
      background-color: rgb(250, 250, 250);
      border: 0.5px solid rgb(219, 219, 219);
      box-sizing: border-box;
      &:last-child {
        border-radius: 5px;
        margin-top: 12px;
        background-color: #0095f6;
        color: white;
        text-align: center;
        padding: 7px 0;
      }
    }
  }
`;

const BottomBox = styled(WhiteBox)`
  padding: 25px 0;
  margin-top: 10px;
  text-align: center;
  font-size: 15px;
  span {
    margin-right: 5px;
  }
  a {
    font-weight: 600;
    color: #0095f6;
  }
`;

const Separator = styled.div`
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
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

const FaceBookLogin = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  span {
    font-weight: 600;
    color: #0095f6;
    margin-left: 5px;
  }
`;
const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <form>
            <input type="text" placeholder="사용자 이름" />
            <input type="password" placeholder="비밀번호" />
            <input type="submit" placeholder="로그인" value="로그인" />
          </form>

          <Separator>
            <div></div>
            <span>or</span>
            <div></div>
          </Separator>
          <FaceBookLogin>
            <FontAwesomeIcon color="#0095f6" icon={faFacebookSquare} />
            <span>Facebook으로 로그인</span>
          </FaceBookLogin>
          <span>비밀번호를 잊으셨나요?</span>
        </TopBox>
        <BottomBox>
          <span>계정이 없으신가요?</span>
          <a href="#">가입하기</a>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};
export default Login;
