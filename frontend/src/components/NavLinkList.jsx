import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function NavLinkList() {
  const userContext = useUserContext();

  return (
    <ul className="md:flex md:flex-row md:gap-4 text-center bg-background">
      {userContext.user ? (
        <>
          <ListItem>
            <span>{userContext.user.preferred_username}</span>
          </ListItem>
          <ListItem>
            <Link to="/search-history">Search history</Link>
          </ListItem>
          <ListItem>
            <button onClick={userContext.signOut}>Sign out</button>
          </ListItem>
        </>
      ) : (
        <ListItem>
          <a href={`${backendHost}/login`}>Sign in</a>
        </ListItem>
      )}
    </ul>
  );
}

function ListItem({ children }) {
  return <li className="p-2">{children}</li>;
}

export default NavLinkList;
