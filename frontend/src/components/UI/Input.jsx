import React, { forwardRef } from "react";

const Input = forwardRef(({ className = "", ...rest }, ref) => {
  return (
    <input
      ref={ref}
      {...rest}
      className={[
        ...[
          "bg-background",
          "rounded",
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-violet-400",
          "invalid:ring-2",
          "invalid:ring-red-400",
          "order-1",
          "peer",
          "px-2",
          "py-1",
          "text-sm",
          "placeholder-gray-700",
        ],
        ...className.split(" "),
      ].join(" ")}
    />
  );
});

export default Input;
