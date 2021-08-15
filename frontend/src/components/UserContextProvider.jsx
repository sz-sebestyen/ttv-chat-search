import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts";

function UserContextProvider({ children }) {
  const [user, setUser] = useState();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
