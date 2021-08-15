import React, { useState } from "react";
import Menu from "./Menu";
import { useHistory } from "react-router-dom";
import NavLinkList from "./NavLinkList";

function NavBar() {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <div>
      <div className="flex justify-between items-center bg-background py-1 px-3 mb-2">
        <div
          onClick={() => history.push("/")}
          className="text-violet-400 text-xl p-1 cursor-pointer"
        >
          TTV Chat Search
        </div>

        <Menu isOpen={isOpen} onClick={toggleMenu} />

        <div className="hidden md:block">
          <NavLinkList />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <NavLinkList />
        </div>
      )}
    </div>
  );
}

export default NavBar;
