import React from "react";

function NotFound() {
  return (
    <div className="bg-background">
      <div className="text-3xl text-center p-2">404 Page not found</div>

      <div className="flex justify-center p-2">
        <img
          src="https://emoji.gg/assets/emoji/1928-modcheck.gif"
          width="64px"
          height="64px"
          alt="modCheck"
        />
      </div>
    </div>
  );
}

export default NotFound;
