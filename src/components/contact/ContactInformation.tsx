"use client";

import React from 'react';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { usePublicCatalogue } from '../../contexts/StoreContext';
import { Stagger, StaggerItem } from '../motion/Stagger';
import { cn } from '../../utils/cn';

export function ContactInformation() {
  const { content } = usePublicCatalogue();

  const items = [
    {
      icon: PhoneIcon,
      label: 'Phone',
      value: content.contact.phone,
      href: `tel:${content.contact.phone.replace(/\s/g, '')}`,
      fullWidth: false
    },
    {
      icon: MailIcon,
      label: 'Email',
      value: content.contact.email,
      href: `mailto:${content.contact.email}`,
      fullWidth: false
    },
    {
      icon: MapPinIcon,
      label: 'Address',
      value: content.contact.addressLines.join(', '),
      fullWidth: true
    },
    {
      icon: ClockIcon,
      label: 'Business hours',
      value: content.contact.hours,
      fullWidth: true
    }
  ];

  return (
    <Stagger className="grid grid-cols-1 gap-x-10 sm:grid-cols-2" each={0.07}>
      {items.map(({ icon: Icon, label, value, href, fullWidth }) => (
        <StaggerItem
          key={label}
          className={cn('border-t border-line py-6', fullWidth && 'sm:col-span-2')}
        >
          <div className="flex items-start gap-4">
            <Icon className="mt-1 h-4 w-4 shrink-0 text-stone" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="label-xs text-stone">{label}</p>
              {href ? (
                <a
                  href={href}
                  className="mt-2 block text-[0.95rem] text-charcoal underline-offset-4 hover:underline"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-2 text-[0.95rem] text-charcoal leading-relaxed">{value}</p>
              )}
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}