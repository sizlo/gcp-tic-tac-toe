interface IPlayers {
    X: string;
    Y: string;
}

export interface IGame {
    id: number;
    board: string;
    players: { [key: string]: string };
    nextPlayer: String;
}

export interface INewGame {
    opponent: string;
}

export interface IUser {
    email: string;
}

export interface IState {
    user: IUser | undefined;
    gameList: Array<IGame> | undefined;
    errors: Array<string>;
}

export interface IAction {
    type: string;
    value: IUser | Array<IGame> | string;
}

export interface IContext {
    state: IState;
    dispatch (action: IAction): void;
}
