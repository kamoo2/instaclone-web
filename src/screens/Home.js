import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Welcom we did it ! </h1>
      <button onClick={() => logUserOut(history)}>로그아웃</button>
    </div>
  );
};

export default Home;
