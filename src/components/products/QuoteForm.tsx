"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { SelectField, TextAreaField, TextField } from '../ui/Field';
import { Button } from '../ui/Button';
import type { QuotePrefill } from '../../contexts/QuoteContext';
import { EASE } from '../motion/variants';

interface QuoteFormProps {
  prefill?: QuotePrefill;
  invert?: boolean;
  compact?: boolean;
  onSubmitted?: () => void;
  submitLabel?: string;
  fixedDivision?: 'laminate' | 'agricultural';
}

interface FormState {
  division: string;
  product: string;
  quantity: string;
  country: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const emptyForm: FormState = {
  division: '',
  product: '',
  quantity: '',
  country: '',
  company: '',
  name: '',
  email: '',
  phone: '',
  message: ''
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuoteForm({
  prefill,
  invert = false,
  compact = false,
  onSubmitted,
  submitLabel = 'Send Message',
  fixedDivision
}: QuoteFormProps) {
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    division: fixedDivision ?? prefill?.division ?? '',
    product: prefill?.product ?? ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [lastUrl, setLastUrl] = useState<string>('');

  const set = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!fixedDivision && !form.division) next.division = 'Select a product division.';
    if (!form.product.trim()) next.product = 'Specify which product or collection you need.';
    if (!form.name.trim()) next.name = 'Please provide a contact name.';
    if (!form.email.trim()) next.email = 'Please provide an email address.'; else
    if (!emailPattern.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please add a brief note about your requirements.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus('submitting');

    // Prepare WhatsApp message with all user inputs from the form
    const divisionLabel =
      form.division === 'laminate' || form.division === 'asa-laminates'
        ? 'ASA Laminates'
        : form.division === 'agricultural'
          ? 'APEDA Agricultural Produce'
          : form.division === 'acrylic-sheets' || form.division === 'industrial'
            ? 'Acrylic Sheets & Boards'
            : form.division;

    const text = [
      `*New Product / Export Quote Request — Swami Marvels*`,
      ``,
      `*Division:* ${divisionLabel || 'General Commercial'}`,
      `*Product:* ${form.product.trim() || 'N/A'}`,
      `*Estimated Quantity:* ${form.quantity.trim() || 'N/A'}`,
      `*Destination / Port:* ${form.country.trim() || 'N/A'}`,
      `*Company:* ${form.company.trim() || 'N/A'}`,
      `*Contact Person:* ${form.name.trim()}`,
      `*Email:* ${form.email.trim()}`,
      `*Phone:* ${form.phone.trim() || 'N/A'}`,
      ``,
      `*Requirements / Message:*`,
      `${form.message.trim()}`
    ].join('\n');

    const whatsappNumber = "919867862233";
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;

    setLastUrl(whatsappUrl);
    setStatus('success');
    onSubmitted?.();

    // Redirect to WhatsApp page with message pre-filled in message box
    window.location.href = whatsappUrl;
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className={invert ? 'text-ivory' : 'text-charcoal'}>
        
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: EASE, delay: 0.05 }}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
          invert ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white'}`
          }>
          
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </motion.span>
        <h3 className="mt-5 font-display text-2xl font-light">Redirecting to WhatsApp…</h3>
        <p className={`mt-3 max-w-md text-sm leading-relaxed ${invert ? 'text-ivory/70' : 'text-slate'}`}>
          Thank you, {form.name.split(' ')[0]}. Your inquiry has been compiled. If WhatsApp does not open automatically, click the button below:
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {lastUrl && (
            <a
              href={lastUrl}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-emerald-700 transition-colors shadow-md"
            >
              <span>Open in WhatsApp</span>
              <span aria-hidden="true">→</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => {
              setForm({ ...emptyForm, division: fixedDivision ?? prefill?.division ?? '', product: prefill?.product ?? '' });
              setStatus('idle');
            }}
            className={`text-xs underline underline-offset-4 ${invert ? 'text-ivory/80' : 'text-charcoal'}`}>
            
            Send another message
          </button>
        </div>
      </motion.div>);

  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className={`grid gap-x-8 gap-y-6 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {!fixedDivision && (
          <SelectField
            label="Product division"
            name="division"
            value={form.division}
            onChange={set('division')}
            error={errors.division}
            required
            invert={invert}
            options={[
              { label: 'Laminates', value: 'laminate' },
              { label: 'Agricultural products', value: 'agricultural' }
            ]}
          />
        )}
        
        <TextField
          label="Product"
          name="product"
          value={form.product}
          onChange={set('product')}
          placeholder="Product name or code"
          invert={invert} />
        
        <TextField
          label="Quantity"
          name="quantity"
          value={form.quantity}
          onChange={set('quantity')}
          placeholder="e.g. 400 sheets / 2 containers"
          invert={invert} />
        
        <TextField
          label="Destination country"
          name="country"
          value={form.country}
          onChange={set('country')}
          invert={invert} />
        
        <TextField label="Company" name="company" value={form.company} onChange={set('company')} invert={invert} />
        <TextField
          label="Contact person"
          name="name"
          value={form.name}
          onChange={set('name')}
          error={errors.name}
          required
          invert={invert} />
        
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          required
          invert={invert} />
        
        <TextField label="Phone" name="phone" type="tel" value={form.phone} onChange={set('phone')} invert={invert} />
        <TextAreaField
          label="Message"
          name="message"
          value={form.message}
          onChange={set('message')}
          error={errors.message}
          required
          rows={4}
          invert={invert}
          className={compact ? '' : 'sm:col-span-2'} />
        
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <Button type="submit" variant={invert ? 'light' : 'solid'} size="lg" withArrow disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Redirecting to WhatsApp…' : submitLabel}
        </Button>
        <AnimatePresence>
          {status === 'submitting' &&
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`text-xs ${invert ? 'text-ivory/60' : 'text-stone'}`}>
            
              Redirecting to WhatsApp…
            </motion.span>
          }
        </AnimatePresence>
      </div>
    </form>);

}