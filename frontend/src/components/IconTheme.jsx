import React from "react";
import { IconContext } from "react-icons";

function IconTheme({ children }) {
  return (
    <IconContext.Provider
      value={{ color: "inherit", style: { fontSize: "2.5em" } }}
    >
      {children}
    </IconContext.Provider>
  );
}

export default IconTheme;
