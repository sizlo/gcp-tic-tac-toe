import UserInfo from "./UserInfo";
import GameList from "./GameList";
import NewGame from "./NewGame";

function Home() {
  return (
    <div className="Home">
      <UserInfo />
      <GameList />
      <NewGame />
    </div>
  );
}

export default Home;