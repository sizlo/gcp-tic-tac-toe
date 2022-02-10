import React, { useEffect } from 'react';
import { API } from "./api"
import { StateContext } from "./StateContext";

function UserInfo() {
  const { state, dispatch } = React.useContext(StateContext);

  useEffect(() => {
    API.getCurrentUser(
      (user) => {
        dispatch({ type: "setUser", value: user })
      },
      (error) => {
        dispatch({
          type: "addError",
          value: `Error fetching current user: ${error}`
        })
      }
    )
  }, [])

  let content = null;

  if (state.user) {
    content = <div>Logged in as: {state.user.email}</div>
  } else {
    content = <div>Loading...</div>;
  }

  return (
    <div className="UserInfo">
      {content}
    </div>
  );
}

export default UserInfo;