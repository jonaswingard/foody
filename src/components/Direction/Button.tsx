import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    className="bg-white border rounded py-2 px-3 block w-full disabled:opacity-25"
  >
    {children}
  </button>
);
