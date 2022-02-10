export interface IGame {
    id: number;
    board: string;
    players: { [key: string]: string };
    nextPlayer: String;
}

export interface INewGame {
    opponent: string;
}

export interface IMove {
    index: number;
    symbol: string;
}

export interface IUser {
    email: string;
}

export interface IState {
    user: IUser | undefined;
    gameList: Array<IGame> | undefined;
    activeGame: IGame | undefined;
    newBoard: string;
    errors: Array<string>;
}

export interface IAction {
    type: string;
    value: IUser | Array<IGame> | IGame | IMove | string;
}

export interface IContext {
    state: IState;
    dispatch (action: IAction): void;
}
