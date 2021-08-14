import React, { forwardRef } from "react";
import Input from "./Input";

const InputWithLabel = forwardRef(
  ({ id, label, invalidMessage = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col bg-surface rounded px-3 py-2 mx-auto mb-2 max-w-sm">
        <Input ref={ref} id={id} {...rest} />

        <label htmlFor={id} className="text-sm mb-1">
          {label}
        </label>

        <div
          data-content={invalidMessage}
          className="peer-invalid:before:content-[attr(data-content)] order-last text-red-400 text-xs pt-1"
        ></div>
      </div>
    );
  }
);

export default InputWithLabel;
