import GameList from "./GameList";
import NewGame from "./NewGame";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <GameList />
      <NewGame />
    </div>
  );
}

export default Home;