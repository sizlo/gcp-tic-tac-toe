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
        setMessage("");

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
                dispatch({
                    type: "addError",
                    value: `Error making move: ${error}`
                });
            }
        )
    }

    const showButton = state.activeGame!.status === "IN_PROGRESS" && isPlayersTurn(state.activeGame!, state.user!.email)

    const button = (
        <button disabled={state.move === undefined || submitting} onClick={() => submit()}>
            {submitting ? "Submitting..." : "Submit move"}
        </button>
    );

    return (
        <div className="MoveSubmit">
            {showButton ? button : null}
            <div>{message}</div>
        </div>
    )
}

export default MoveSubmit;