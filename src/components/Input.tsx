import React, {
  ButtonHTMLAttributes,
  FC,
  forwardRef,
  PropsWithChildren,
} from "react";

interface IInput extends ButtonHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className, children, ...props }, ref) => (
    <input
      {...props}
      ref={ref}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight placeholder-gray-500 placeholder:italic disabled:text-gray-300 ${
        className ?? ""
      }`.trimEnd()}
    >
      {children}
    </input>
  )
);
Input.displayName = "Input";
