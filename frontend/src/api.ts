import { IGame, IUser, INewGame, IMove, IMoveResponse } from "./types";

function parseJson(response: Response): any {
    if (!response.ok) {
        throw Error(`Http error code=${response.status} text=${response.statusText}`);
    }
    return response.json()
}

export class API {

    static getGameList(successCallback: (result: Array<IGame>) => void, errorCallback: (error: Error) => void ) {
        fetch("/api/games")
            .then((response) => parseJson(response))    
            .then(
                (result) => {
                    successCallback(result);
                },
                (error) => {
                    errorCallback(error);
                }
            )
    }

    static getGame(id: number, successCallback: (result: IGame) => void, errorCallback: (error: Error) => void ) {
        fetch(`/api/games/${id}`)
            .then((response) => parseJson(response))    
            .then(
                (result) => {
                    successCallback(result);
                },
                (error) => {
                    errorCallback(error);
                }
            )
    }

    static getCurrentUser(successCallback: (result: IUser) => void, errorCallback: (error: Error) => void) {
        fetch("/api/users/current")
            .then((response) => parseJson(response))
            .then(
                (result) => {
                    successCallback(result);
                },
                (error) => {
                    errorCallback(error);
                }
            )
    }

    static newGame(game: INewGame, successCallback: (game: IGame) => void, errorCallback: (error: Error) => void) {
        const options = { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        }

        fetch("/api/games", options)
            .then((response) => parseJson(response))
            .then(
                (result) => {
                    successCallback(result);
                },
                (error) => {
                    errorCallback(error);
                }
            )
    }

    static makeMove(gameId: number, move: IMove, successCallback: (game: IMoveResponse) => void, errorCallback: (error: Error) => void) {
        const options = { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(move)
        }

        fetch(`/api/games/${gameId}/move`, options)
            .then((response) => parseJson(response))
            .then(
                (result) => {
                    successCallback(result);
                },
                (error) => {
                    errorCallback(error);
                }
            )
    }

}
