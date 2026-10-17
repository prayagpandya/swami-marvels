import React, { useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircleIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BaseFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  invert?: boolean;
  className?: string;
}

const shellClasses = (invert: boolean, hasError: boolean) =>
cn(
  'peer w-full appearance-none border-b bg-transparent px-0 py-3 text-[0.95rem] outline-none transition-colors duration-200',
  invert ?
  'border-ivory/25 text-ivory placeholder:text-ivory/35 focus:border-ivory' :
  'border-line text-charcoal placeholder:text-stone/60 focus:border-charcoal',
  hasError && '!border-clay'
);

function Label({ children, htmlFor, invert }: {children: React.ReactNode;htmlFor: string;invert: boolean;}) {
  return (
    <label htmlFor={htmlFor} className={cn('label-xs block', invert ? 'text-ivory/55' : 'text-stone')}>
      {children}
    </label>);

}

function ErrorText({ error }: {error?: string;}) {
  return (
    <AnimatePresence initial={false}>
      {error &&
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        className="mt-2 flex items-center gap-1.5 text-xs text-clay">
        
          <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </motion.p>
      }
    </AnimatePresence>);

}

interface TextFieldProps extends BaseFieldProps {
  type?: string;
  onChange: (value: string) => void;
}

export function TextField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  type = 'text',
  invert = false,
  className
}: TextFieldProps) {
  const id = useId();
  return (
    <div className={cn('relative', className)}>
      <Label htmlFor={id} invert={invert}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={shellClasses(invert, !!error)} />
      
      <ErrorText error={error} />
    </div>);

}

interface TextAreaProps extends BaseFieldProps {
  rows?: number;
  onChange: (value: string) => void;
}

export function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  rows = 4,
  invert = false,
  className
}: TextAreaProps) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} invert={invert}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={cn(shellClasses(invert, !!error), 'resize-none')} />
      
      <ErrorText error={error} />
    </div>);

}

interface SelectFieldProps extends BaseFieldProps {
  options: {label: string;value: string;}[];
  onChange: (value: string) => void;
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
  invert = false,
  className
}: SelectFieldProps) {
  const id = useId();
  return (
    <div className={className}>
      <Label htmlFor={id} invert={invert}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Label>
      <select
        id={id}
        name={name}
        value={value}
        required={required}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
        className={cn(shellClasses(invert, !!error), invert && '[&>option]:text-charcoal')}>
        
        <option value="">Select…</option>
        {options.map((o) =>
        <option key={o.value} value={o.value}>
            {o.label}
          </option>
        )}
      </select>
      <ErrorText error={error} />
    </div>);

}