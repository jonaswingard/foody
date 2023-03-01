import React, { ButtonHTMLAttributes, forwardRef } from "react";

interface ITextArea extends ButtonHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
  ({ className, children, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      className={`w-full p-3 rounded-lg shadow-md bg-white placeholder-gray-500 placeholder:italic disabled:text-gray-300 ${
        className ?? ""
      }`.trimEnd()}
    >
      {children}
    </textarea>
  )
);
TextArea.displayName = "TextArea";

export default TextArea;
