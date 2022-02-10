import React from "react";
import { reducer, initialState } from "./reducer";
import { StateContext } from "./StateContext";

export const StateProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={{ state, dispatch }}>
        { children }
    </StateContext.Provider>
  )
}