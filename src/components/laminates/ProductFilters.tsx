import React from 'react';
import { cn } from '../../utils/cn';

export interface FilterGroup {
  key: string;
  label: string;
  options: {value: string;label: string;swatch?: string;}[];
}

interface Props {
  groups: FilterGroup[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  hasActive: boolean;
}

export function ProductFilters({ groups, values, onChange, onClear, hasActive }: Props) {
  return (
    <div className="flex flex-col gap-9">
      {groups.map((group) =>
      <fieldset key={group.key}>
          <legend className="label-xs mb-4 text-stone">{group.label}</legend>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => {
            const isActive = values[group.key] === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChange(group.key, isActive ? '' : option.value)}
                className={cn(
                  'inline-flex min-h-[38px] items-center gap-2 border px-3 text-[0.8125rem] transition-colors duration-200',
                  isActive ?
                  'border-charcoal bg-charcoal text-ivory' :
                  'border-line text-slate hover:border-stone'
                )}>
                
                  {option.swatch &&
                <span
                  className="h-3 w-3 rounded-full ring-1 ring-inset ring-ink/10"
                  style={{ backgroundColor: option.swatch }}
                  aria-hidden="true" />

                }
                  {option.label}
                </button>);

          })}
          </div>
        </fieldset>
      )}

      {hasActive &&
      <button
        type="button"
        onClick={onClear}
        className="self-start text-[0.8125rem] text-charcoal underline underline-offset-4">
        
          Clear all filters
        </button>
      }
    </div>);

}