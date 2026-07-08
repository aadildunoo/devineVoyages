import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'cta';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  fullWidth?: boolean;
  icon?: ReactNode;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  loading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${loading ? 'btn-loading' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
