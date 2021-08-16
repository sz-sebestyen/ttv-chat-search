import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../hooks";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function NavLinkList() {
  const userContext = useUserContext();
  const location = useLocation();

  return (
    <ul className="md:flex md:flex-row md:gap-4 text-center bg-background">
      {userContext.user ? (
        <>
          <ListItem>
            <span className="text-gray-600">
              {userContext.user.preferred_username}
            </span>
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
          <a href={`${backendHost}/login?state=${location.pathname}`}>
            Sign in
          </a>
        </ListItem>
      )}
    </ul>
  );
}

function ListItem({ children }) {
  return <li className="p-2">{children}</li>;
}

export default NavLinkList;
