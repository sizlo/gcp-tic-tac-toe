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
        
        default:
            return state;
    }
}

export const initialState: IState = {
    gameList: undefined,
    user: undefined,
}