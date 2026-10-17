"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { TextAreaField, TextField } from '../ui/Field';
import { Button } from '../ui/Button';
import { EASE } from '../motion/variants';

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const empty: FormState = { name: '', company: '', email: '', phone: '', subject: '', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [lastUrl, setLastUrl] = useState<string>('');

  const set = (key: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter an email address.'; else
    if (!emailPattern.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please add a message.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('submitting');

    // Prepare WhatsApp message with all user inputs from the form
    const text = [
      `*New Contact Inquiry — Swami Marvels*`,
      ``,
      `*Name:* ${form.name.trim()}`,
      `*Company:* ${form.company.trim() || 'N/A'}`,
      `*Email:* ${form.email.trim()}`,
      `*Phone:* ${form.phone.trim() || 'N/A'}`,
      `*Subject:* ${form.subject.trim() || 'General Inquiry'}`,
      ``,
      `*Message:*`,
      `${form.message.trim()}`
    ].join('\n');

    const whatsappNumber = "919867862233";
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedText}`;

    setLastUrl(whatsappUrl);
    setStatus('success');

    // Redirect to WhatsApp page with message pre-filled in message box
    window.location.href = whatsappUrl;
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-light text-charcoal">Redirecting to WhatsApp…</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">
          Your inquiry has been compiled. If WhatsApp does not open automatically, click the button below to continue with your pre-filled message:
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
              setForm(empty);
              setStatus('idle');
            }}
            className="text-xs text-charcoal underline underline-offset-4"
          >
            Send another message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <TextField label="Name" name="name" value={form.name} onChange={set('name')} error={errors.name} required />
        <TextField label="Company" name="company" value={form.company} onChange={set('company')} />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          required />
        
        <TextField label="Phone" name="phone" type="tel" value={form.phone} onChange={set('phone')} />
        <TextField label="Subject" name="subject" value={form.subject} onChange={set('subject')} className="sm:col-span-2" />
        <TextAreaField
          label="Message"
          name="message"
          value={form.message}
          onChange={set('message')}
          error={errors.message}
          required
          rows={5}
          className="sm:col-span-2" />
        
      </div>
      <div className="mt-8">
        <Button type="submit" size="lg" withArrow disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Redirecting to WhatsApp…' : 'Send Message'}
        </Button>
      </div>
    </form>);

}