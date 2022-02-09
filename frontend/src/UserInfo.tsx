import React, { useState, useEffect } from 'react';
import { IUser } from "./types";
import { API } from "./api"

function UserInfo() {
  const dummyUser = { email: "dummy@example.com" }

  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<IUser>(dummyUser);

  useEffect(() => {
    API.getCurrentUser(
      (user => {
        setIsLoaded(true);
        setUser(user);
      }),
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [])

  let content = null;

  if (error) {
    content = <div>Error loading user info: {error.message}</div>;
  } else if (!isLoaded) {
    content = <div>Loading...</div>;
  } else {
    content = <div>Logged in as: {user.email}</div>
  }

  return (
    <div className="UserInfo">
      {content}
    </div>
  );
}

export default UserInfo;