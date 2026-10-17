import React from 'react';
import { cn } from '../../utils/cn';

export function AdminPageHeader({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-zinc-800/90 pb-7 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1.5">
        <h1 className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0 pt-2 sm:pt-0">
          {action}
        </div>
      )}
    </div>
  );
}

export function AdminButton({
  children,
  onClick,
  variant = 'solid',
  type = 'button',
  size = 'md',
  className,
  disabled,
  ariaLabel
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'ghost' | 'danger';
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const variants = {
    solid: 'bg-white text-zinc-950 hover:bg-zinc-200 font-medium shadow-sm active:scale-[0.99]',
    outline: 'border border-zinc-700 bg-zinc-900/80 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white',
    ghost: 'text-zinc-400 hover:text-white hover:bg-zinc-800/70',
    danger: 'border border-red-900/50 bg-red-950/25 text-red-400 hover:bg-red-900/40 hover:text-red-200'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono text-xs uppercase tracking-wider transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed',
        size === 'sm' ? 'min-h-[36px] px-3.5 text-[0.72rem]' : 'min-h-[42px] px-5 text-[0.78rem]',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

export function AdminField({
  label,
  children,
  className
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="block font-mono text-[0.72rem] uppercase tracking-wider text-zinc-200 font-semibold mb-1.5">
        {label}
      </span>
      <span className="block">{children}</span>
    </label>
  );
}

const inputClasses =
  'w-full rounded-md border border-zinc-700 bg-[#16161C] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-400 outline-none transition-all duration-150 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50';

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputClasses, props.className)} />;
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputClasses, 'resize-none', props.className)} />;
}

export function AdminSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputClasses, props.className)} />;
}

export function Toggle({
  checked,
  onChange,
  label
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 shrink-0 text-xs font-mono text-zinc-300 select-none cursor-pointer"
    >
      <span
        className={cn(
          'relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors duration-200',
          checked ? 'bg-white' : 'bg-zinc-800 border border-zinc-700'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-4 w-4 rounded-full shadow-xs transition-transform duration-200 pointer-events-none',
            checked ? 'translate-x-4 bg-zinc-950' : 'translate-x-0 bg-zinc-400'
          )}
        />
      </span>
      {label && <span className="shrink-0 min-w-[2.25rem] text-left">{label}</span>}
    </button>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center font-mono text-xs text-zinc-400">
      {message}
    </div>
  );
}