import { IState, IAction, IUser, IGame } from "./types";

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
                activeGame: action.value as IGame
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
    user: undefined,
    errors: []
}