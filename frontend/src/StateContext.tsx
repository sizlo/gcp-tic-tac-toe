import React from "react";
import { initialState } from "./reducer"
import { IAction, IContext } from "./types";

export const StateContext = React.createContext<IContext>({
  state: initialState,
  dispatch: (action: IAction) => null
})
