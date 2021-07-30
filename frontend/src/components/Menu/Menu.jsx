import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <div onClick={toggleMenu}>
      {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
    </div>
  );
}

export default Menu;
