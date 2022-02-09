import UserInfo from "./UserInfo";
import GameList from "./GameList";

function Home() {
  return (
    <div className="Home">
      <UserInfo />
      <GameList />
    </div>
  );
}

export default Home;