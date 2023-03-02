import React, { ButtonHTMLAttributes, FC, PropsWithChildren } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
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
      variant === "primary"
        ? "bg-blue-400 hover:bg-blue-700 text-white"
        : variant === "danger"
        ? "bg-red-400 hover:bg-red-700 text-white"
        : "bg-white shadow-md border-slate-300"
    }  ${className ?? ""}`.trimEnd()}
  >
    {children}
  </button>
);
