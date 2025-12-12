import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0f14] disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#0acffe] text-[#0a0f14] hover:bg-[#28ffd3] focus:ring-[#0acffe]',
    secondary: 'bg-[#1a232c] text-[#e6edf3] hover:bg-[#11181f] border border-[#1a232c] focus:ring-[#0acffe]',
    ghost: 'bg-transparent text-[#e6edf3] hover:bg-[#1a232c] focus:ring-[#0acffe]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
