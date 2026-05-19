/**
 * Shared Framer Motion variants and transitions.
 *
 * Use these everywhere instead of inlining magic numbers. Springs are tuned
 * to feel "paper-y": fast onset, soft settle, no overshoot wobble.
 */
import type { Transition, Variants } from "framer-motion";

/* ---------- Transitions ---------- */

/** Soft, paper-settle spring. Good for hero reveal and large blocks. */
export const springSmooth: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.9,
};

/** Snappy spring. Good for hover lifts and small UI bits. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.6,
};

/** Tweened ease that matches the certificate tear motion. */
export const easeTear: Transition = {
  duration: 0.48,
  ease: [0.22, 1, 0.36, 1],
};

/** Slower tweened ease for staggered text reveals. */
export const easeTextReveal: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
};

/* ---------- Variants ---------- */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: easeTextReveal },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: easeTextReveal },
};

export const fadeUpLarge: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: springSmooth },
};

/**
 * Stagger container. Children should declare `variants` to be coordinated.
 * Pass `staggerChildren(0.08)` for word-by-word reveals, or default 0.12 for
 * larger blocks.
 */
export const staggerChildren = (stagger: number = 0.12): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
});

/** Word-by-word headline reveal (use inside a stagger container). */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Card hover lift. */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: springSnappy },
};
