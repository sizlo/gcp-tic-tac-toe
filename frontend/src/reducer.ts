import { IState, IAction, IUser, IGame, IMove } from "./types";

export const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
        case "setUser": 
            return {
                ...state,
                user: action.value as IUser
            }

        case "setGameList":
            return {
                ...state,
                gameList: action.value as Array<IGame>
            }

        case "setActiveGame":
            return {
                ...state,
                activeGame: action.value as IGame,
                newBoard: (action.value as IGame).board 
            }

        case "makeMove":
            let move = action.value as IMove;
            let existingBoard = state.activeGame!.board;
            let newBoard = existingBoard.substring(0, move.index) + move.symbol + existingBoard.substring(move.index + 1);
            return {
                ...state,
                newBoard: newBoard
            }

        case "addError":
            state.errors.push(action.value as string);
            return {
                ...state,
                errors: state.errors
            }
        
        default:
            return state;
    }
}

export const initialState: IState = {
    gameList: undefined,
    activeGame: undefined,
    newBoard: "",
    user: undefined,
    errors: []
}