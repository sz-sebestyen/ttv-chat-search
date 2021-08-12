import React from "react";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";

function NavBar() {
  const history = useHistory();

  return (
    <div className="flex justify-between items-center bg-background py-1 px-3 mb-2">
      <h1
        onClick={() => history.push("/")}
        className="text-violet-400 text-xl p-1 cursor-pointer"
      >
        TTV Chat Search
      </h1>

      <Menu />
    </div>
  );
}

export default NavBar;
