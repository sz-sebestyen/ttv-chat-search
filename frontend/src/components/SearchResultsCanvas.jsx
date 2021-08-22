import React, { useState, useLayoutEffect, forwardRef } from "react";

const SearchResultsBar = forwardRef(({ onClick }, ref) => {
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
  const canvasHeight = 20;

  useLayoutEffect(() => {
    const updateCanvasWidth = () => {
      setCanvasWidth(window.innerWidth);
    };

    window.addEventListener("resize", updateCanvasWidth);

    return () => window.removeEventListener("resize", updateCanvasWidth);
  }, []);

  return (
    <canvas
      ref={ref}
      id="canvas"
      height={canvasHeight}
      width={canvasWidth}
      className="w-full flex-0 border-b-4 border-b-surface cursor-pointer"
      onClick={onClick}
    ></canvas>
  );
});

export default SearchResultsBar;
