/**
 * Site Configuration
 *
 * Central configuration file for easy customization.
 * Update these values to personalize your template.
 */

export const siteConfig = {
  name: "AntimatterAI",
  tagline: "The nervous system that turns frontier models into deployed digital workers.",
  description:
    "AntimatterAI wires frontier models into governed, auditable execution across phones, EHRs, CRMs, billing, and mission-critical SaaS deployable in your VPC, edge, or on-prem.",
  url: "https://example.com",
  social: {
    twitter: "@antimatterai",
    github: "https://github.com/mattantimatter/testreactbits",
  },
  nav: {
    cta: {
      text: "Talk to the operators",
      href: "#",
    },
    signIn: {
      text: "See how it works",
      href: "#",
    },
  },
} as const;

export const heroConfig = {
  headline: {
    prefix: "AntimatterAI: The Nervous System +",
    accent: "Spine",
    suffix: "for Deployed AI",
  },
  description:
    "Transform Grok, Claude, and ChatGPT from brains into governed, auditable digital workers wired into your phones, EHRs, CRMs, billing systems, and mission-critical SaaS.",
  cta: {
    primary: {
      text: "Talk to the operators",
      href: "#",
    },
    secondary: {
      text: "See how it works",
      href: "#how-it-works",
    },
  },
  carousel: [
    "Grok (xAI)",
    "ChatGPT (OpenAI)",
    "Claude (Anthropic)",
    "Voice Agents",
    "Workflow Agents",
    "Enterprise Security",
    "Model Orchestration",
    "Audit Trails",
    "Replay + HITL",
    "Least Privilege",
    "VPC / On-Prem",
    "Regulated Execution",
  ],
} as const;

export const howItWorksConfig = {
  title: "How It Works: Brain -> Spine -> Digital Worker",
  description:
    "Use Grok, GPT, Claude or multiple, deploy to your infrastructure, and connect to critical systems with governed execution.",
  cta: {
    text: "See how it works",
    href: "#",
  },
} as const;

export const featuresConfig = {
  title: "The Result: Digital Workers That Run in Production",
  description:
    "Voice, workflow, and security capabilities built for regulated operations and measurable outcomes.",
} as const;

export const statsConfig = {
  title: "The Brains",
  description: "Frontier models are powerful. Alone, they do not run your business.",
} as const;

export const testimonialsConfig = {
  title: "Where We Win (and Where We Don't Compete)",
} as const;

export const pricingConfig = {
  title: "Human<->AI Workforce Enablement",
  description:
    "The bottleneck is not intelligence. It is safe delegation, adoption, and accountability.",
  cta: {
    primary: {
      text: "Book a call",
      href: "#",
    },
    secondary: {
      text: "Request a demo",
      href: "#",
    },
  },
} as const;

export const faqConfig = {
  title: "Trust by Design",
  contact: {
    text: "Enterprises treat agents with account access as a liability.",
    cta: {
      text: "Talk to the operators",
      href: "mailto:operators@antimatterai.com",
    },
  },
} as const;

export const finalCtaConfig = {
  headline: "Ready to deploy governed AI workers?",
  description:
    "Bring your preferred models. We'll bring the spine: orchestration, security, and execution in production.",
  cta: {
    text: "Book a call",
    href: "#",
  },
} as const;

export const footerConfig = {
  description:
    "AntimatterAI is the nervous system and spine for governed digital workers in regulated execution.",
  cta: {
    text: "Book a call",
    href: "#",
  },
  links: {
    product: [
      { label: "Model orchestration", href: "#" },
      { label: "Governance + replay", href: "#" },
      { label: "Regulated execution", href: "#" },
      { label: "Enterprise deployment", href: "#" },
    ],
    company: [
      { label: "Healthcare + RCM", href: "#" },
      { label: "Biotech operations", href: "#" },
      { label: "Security programs", href: "#" },
      { label: "Mission-critical SaaS", href: "#" },
    ],
  },
  contact: {
    location: "Global",
    address: "Governed deployment programs\nfor regulated enterprises",
    hours: "Operator hours by engagement",
    email: "operators@antimatterai.com",
  },
  copyright: `© ${new Date().getFullYear()} AntimatterAI`,
} as const;

/**
 * Feature Flags
 *
 * Toggle features on/off for easy customization.
 */
export const features = {
  smoothScroll: true,
  darkMode: true,
  ditherCursor: true,
  statsSection: true,
} as const;
