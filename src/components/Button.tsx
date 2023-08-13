import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...defaultProps }: ButtonProps) {
  return (
    <button type="button" {...defaultProps}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  label: "",
};
