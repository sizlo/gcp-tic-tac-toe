import React from 'react';
import { useNavigate } from "react-router-dom";
import { StateContext } from "./StateContext";
import { API } from "./api";

function NewGame() {
    const { state, dispatch } = React.useContext(StateContext);
    const [opponent, setOpponent] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newGame = { opponent}
        API.newGame(
            newGame,
            (createdGame) => {
                console.log(`Created game: ${createdGame.id}`);
                navigate("/game");
            },
            (error) => {
                dispatch({
                    type: "addError",
                    value: `Error creating new game: ${error}`
                });
            }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>New game:</label>
            <input 
                type="text" 
                value={opponent} 
                placeholder="opponent@example.com"
                onChange={(event) => setOpponent(event.target.value)} 
            />
            <input type="submit" disabled={state.user === undefined || opponent.length === 0}/>
        </form>
    )
}

export default NewGame;