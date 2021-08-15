import React from "react";
import { Link } from "react-router-dom";

const backendHost = process.env.REACT_APP_BACKEND_HOST;

function NavLinkList() {
  return (
    <ul className="md:flex md:flex-row md:gap-4 text-center bg-background">
      <ListItem>
        <Link to="/search-history">Search history</Link>
      </ListItem>
      <ListItem>
        <a href={`${backendHost}/login`}>Sign in</a>
      </ListItem>
      <ListItem>
        <Link to="/logout">Sign out</Link>
      </ListItem>
    </ul>
  );
}

function ListItem({ children }) {
  return <li className="p-2">{children}</li>;
}

export default NavLinkList;
