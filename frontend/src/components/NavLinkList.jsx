import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks";
import SignInLink from "./SignInLink";

function NavLinkList() {
  const userContext = useUserContext();

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
          <SignInLink />
        </ListItem>
      )}
    </ul>
  );
}

function ListItem({ children }) {
  return <li className="p-2 hover:text-violet-400">{children}</li>;
}

export default NavLinkList;
