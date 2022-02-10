import GameList from "./GameList";
import NewGame from "./NewGame";

function Home() {
  return (
    <div className="Home">
      <GameList />
      <NewGame />
    </div>
  );
}

export default Home;