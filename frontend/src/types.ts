export interface IGame {
    id: number;
    status: string;
    board: string;
    players: { [key: string]: string };
    nextPlayer: String;
    winner: string;
}

export interface INewGame {
    opponent: string;
}

export interface IMove {
    index: number;
    symbol: string;
}

export interface IMoveResponse {
    game: IGame,
    valid: boolean,
    message: string
}

export interface IUser {
    email: string;
}

export interface IState {
    user: IUser | undefined;
    gameList: Array<IGame> | undefined;
    activeGame: IGame | undefined;
    move: IMove | undefined;
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
