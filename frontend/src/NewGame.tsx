import React from 'react';
import { useNavigate } from "react-router-dom";
import { StateContext } from "./StateContext";
import { API } from "./api";
import "./NewGame.css";

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
                navigate(`/game/${createdGame.id}`);
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