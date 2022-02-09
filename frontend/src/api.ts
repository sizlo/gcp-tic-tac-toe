import { IGame } from "./types";

export class API {

    static getGameList(successCallback: (result: Array<IGame>) => void, errorCallback: (error: Error) => void ) {
        fetch("/api/games")
            .then((response) => {
                if (!response.ok) {
                    throw Error(`Http error code=${response.status} text=${response.statusText}`);
                }
                return response.json()
            })    
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
