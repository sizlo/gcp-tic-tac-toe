import React from "react";
import { StateContext } from "./StateContext";
import { isPlayersTurn, getPlayerSymbol } from "./gameUtils";
import "./Cell.css";

interface CellProps {
    borderClasses: string;
    index: number;
}

function Cell(props: CellProps) {
    const { state, dispatch } = React.useContext(StateContext);

    let committedSymbol = state.activeGame!.board[props.index];
    let newBoardSymbol = state.newBoard[props.index];

    let hasCommittedSymbol = committedSymbol === "X" || committedSymbol === "O";
    let hasNewBoardSymbol = newBoardSymbol === "X" || newBoardSymbol === "O";
    
    let clickable = !hasCommittedSymbol 
        && isPlayersTurn(state.activeGame!, state.user!.email) 
        && state.activeGame!.status === "IN_PROGRESS";

    let symbol = hasCommittedSymbol ? committedSymbol : hasNewBoardSymbol ? newBoardSymbol : "";

    const stageMove = function() {
        if (clickable) {
            dispatch({
                type:"stageMove",
                value: {
                    index: props.index,
                    symbol: getPlayerSymbol(state.activeGame!, state.user!.email)
                }
            })
        }
    };

    return (
        <div className={`Cell ${props.borderClasses}`}>
            <div 
                className={`cellContent ${clickable ? "clickable": ""}`}
                onClick={ () => stageMove() }
            >
                {symbol}
            </div>
        </div>
    );
}

export default Cell;