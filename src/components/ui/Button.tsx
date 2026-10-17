import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

type Variant = 'solid' | 'yellow' | 'dark' | 'outline' | 'light' | 'link';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
}

const base =
'group inline-flex items-center justify-center gap-2.5 font-medium tracking-[0.02em] transition-[background-color,color,border-color,transform] duration-200 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

const sizes: Record<Size, string> = {
  sm: 'min-h-[40px] px-4 text-[0.8125rem]',
  md: 'min-h-[48px] px-6 text-sm',
  lg: 'min-h-[56px] px-8 text-[0.9375rem]'
};

const variants: Record<Variant, string> = {
  solid: 'bg-zinc-950 text-white font-semibold hover:bg-zinc-800 shadow-sm active:scale-[0.99] border border-zinc-900',
  yellow: 'bg-[#FACC15] text-black font-semibold hover:bg-[#EAB308] shadow-sm',
  dark: 'bg-black text-white font-semibold hover:bg-zinc-900 border border-zinc-800 shadow-sm',
  outline: 'border border-zinc-800 text-zinc-950 hover:border-black hover:bg-zinc-950 hover:text-white',
  light: 'border border-zinc-300 bg-white text-zinc-950 hover:bg-zinc-100 shadow-xs',
  link: 'p-0 min-h-0 text-zinc-900 underline-offset-[6px] hover:underline'
};

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  withArrow = false,
  className,
  to,
  href,
  onClick,
  type = 'button',
  disabled,
  ariaLabel
}: CommonProps) {
  const classes = cn(base, variant !== 'link' && sizes[size], variants[variant], className);

  const content =
  <>
      <span>{children}</span>
      {withArrow &&
    <ArrowRightIcon
      className="h-4 w-4 transition-transform duration-200 ease-premium group-hover:translate-x-1"
      aria-hidden="true" />

    }
    </>;


  if (to) {
    return (
      <Link href={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>);

  }

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>);

  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>);

}