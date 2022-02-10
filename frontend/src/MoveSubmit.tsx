import React from "react";
import { StateContext } from "./StateContext";
import { API } from "./api";

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

    return (
        <div className="MoveSubmit">
            <button disabled={state.move === undefined || submitting} onClick={() => submit()}>Submit move</button>
            <div>{message}</div>
        </div>
    )
}

export default MoveSubmit;