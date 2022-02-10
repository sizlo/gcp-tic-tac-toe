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

    let hasComittedSymbol = committedSymbol === "X" || committedSymbol === "O";
    let hasNewBoardSymbol = newBoardSymbol === "X" || newBoardSymbol === "O";
    
    let clickable = !hasComittedSymbol && isPlayersTurn(state.activeGame!, state.user!.email);

    let symbol = hasComittedSymbol ? committedSymbol : hasNewBoardSymbol ? newBoardSymbol : "";

    const makeMove = function() {
        if (clickable) {
            dispatch({
                type:"makeMove",
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
                onClick={ () => makeMove() }
            >
                {symbol}
            </div>
        </div>
    );
}

export default Cell;