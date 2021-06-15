import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      avatar
    }
  }
`;
function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const history = useHistory();
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken, // LS에 TOKEN이 존재하지 않으면 쿼리 실행되지 않음
  });

  //useEffect를 해준 이유는 data가 변경될때
  useEffect(() => {
    // ME_QUERY는 protectedResolver이기 때문에 token이 있는데 그 token에 해당하는 유저가 없다면
    // 그리고 type이 query이면 return null이 된다.
    // 따라서 data?.me가 null인 경우에는 잘못된 TOKEN이라는 것을 뜻하기 때문에 로그아웃
    if (data?.me === null) {
      logUserOut(history);
    }
  }, [data, history]);
  return data;
}

export default useUser;
