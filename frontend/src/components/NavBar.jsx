import React from "react";
import Menu from "./Menu";

function NavBar() {
  return (
    <div className="flex justify-between items-center">
      <h1>TTV Chat Search</h1>
      <Menu />
    </div>
  );
}

export default NavBar;
