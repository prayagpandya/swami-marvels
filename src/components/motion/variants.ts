import type { Variants } from 'framer-motion';

export const EASE = [0.23, 1, 0.32, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const VIEWPORT = { once: true, amount: 0.15 } as const;

export const fadeUp = (distance = 28, duration = 0.6, delay = 0): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } }
});

export const fadeDown = (distance = 24, duration = 0.55, delay = 0): Variants => ({
  hidden: { opacity: 0, y: -distance },
  show: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } }
});

export const slideLeft = (distance = 48, duration = 0.7, delay = 0): Variants => ({
  hidden: { opacity: 0, x: distance },
  show: { opacity: 1, x: 0, transition: { duration, ease: EASE, delay } }
});

export const slideRight = (distance = 48, duration = 0.7, delay = 0): Variants => ({
  hidden: { opacity: 0, x: -distance },
  show: { opacity: 1, x: 0, transition: { duration, ease: EASE, delay } }
});

export const scaleIn = (from = 0.96, duration = 0.55, delay = 0): Variants => ({
  hidden: { opacity: 0, scale: from },
  show: { opacity: 1, scale: 1, transition: { duration, ease: EASE, delay } }
});

export const clipReveal = (
direction: 'up' | 'down' | 'left' | 'right' = 'up',
duration = 0.85,
delay = 0)
: Variants => {
  const hiddenClip =
  direction === 'up' ?
  'inset(100% 0% 0% 0%)' :
  direction === 'down' ?
  'inset(0% 0% 100% 0%)' :
  direction === 'left' ?
  'inset(0% 0% 0% 100%)' :
  'inset(0% 100% 0% 0%)';

  return {
    hidden: { clipPath: hiddenClip, opacity: 1 },
    show: {
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration, ease: EASE }
    }
  };
};

export const stagger = (each = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } }
});

export const textReveal = (duration = 0.7, delay = 0): Variants => ({
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration, ease: EASE, delay } }
});