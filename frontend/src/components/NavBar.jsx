import React from "react";
import Menu from "./Menu";

function NavBar() {
  return (
    <div className="flex justify-between items-center bg-background py-1 px-3 mb-2">
      <h1 className="text-violet-400 text-xl p-1">TTV Chat Search</h1>

      <Menu />
    </div>
  );
}

export default NavBar;
