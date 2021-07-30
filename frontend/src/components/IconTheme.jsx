import React from "react";
import { IconContext } from "react-icons";

function IconTheme({ children }) {
  return (
    <IconContext.Provider value={{ color: "red", style: { fontSize: "3em" } }}>
      {children}
    </IconContext.Provider>
  );
}

export default IconTheme;
