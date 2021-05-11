import { logUserOut } from "../apollo";

const Home = () => {
  return (
    <div>
      <h1>Welcom we did it ! </h1>
      <button onClick={() => logUserOut()}>로그아웃</button>
    </div>
  );
};

export default Home;
