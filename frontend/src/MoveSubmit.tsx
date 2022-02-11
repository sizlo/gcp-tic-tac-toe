import React from "react";
import { StateContext } from "./StateContext";
import { API } from "./api";
import { isPlayersTurn } from "./gameUtils";

function MoveSubmit() {
    const { state, dispatch } = React.useContext(StateContext);
    const [message, setMessage] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);

    const submit = function() {
        setSubmitting(true);
        setMessage("Submitting...");

        API.makeMove(
            state.activeGame!.id, state.move!,
            (moveResponse) => {
                dispatch({ type: "setActiveGame", value: moveResponse.game });
                setSubmitting(false);    
                if (moveResponse.valid) {
                    setMessage("Move successfully submitted");
                } else {
                    setMessage(`Invalid move: ${moveResponse.message}`)
                }
            },
            (error) => {
                setSubmitting(false);
                setMessage("");
                dispatch({
                    type: "addError",
                    value: `Error making move: ${error}`
                });
            }
        )
    }

    if (state.activeGame!.status !== "IN_PROGRESS" || !isPlayersTurn(state.activeGame!, state.user!.email)) {
        return <React.Fragment />
    }

    return (
        <div className="MoveSubmit">
            <button disabled={state.move === undefined || submitting} onClick={() => submit()}>Submit move</button>
            <div>{message}</div>
        </div>
    )
}

export default MoveSubmit;