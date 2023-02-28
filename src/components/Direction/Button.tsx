import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  variant,
  ...props
}) => (
  <button
    {...props}
    className={`border rounded py-2 px-3 disabled:opacity-25 ${
      variant === "primary" ? "bg-white" : "shadow-md border-slate-300"
    }  ${className ?? ""}`.trimEnd()}
  >
    {children}
  </button>
);
