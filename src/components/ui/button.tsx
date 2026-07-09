import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Readonly<
  ButtonHTMLAttributes<HTMLButtonElement>
> {
  readonly variant?: 'primary' | 'secondary' | 'danger';
}

export default function Button({
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        rounded-lg
        bg-blue-600
        px-4
        py-2
        text-white
        transition
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:bg-gray-400
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
