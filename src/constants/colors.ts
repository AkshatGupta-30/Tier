import type { BackgroundOption } from '@ts/theme';

export const LIGHT_BACKGROUND_OPTIONS: BackgroundOption[] = [
  // --- LIGHT THEME: SOLIDS ---
  {
    id: 'light-solid-zinc',
    label: 'Clean Zinc',
    classes: 'bg-zinc-50',
    theme: 'light',
    type: 'solid',
  },
  {
    id: 'light-solid-blue',
    label: 'Soft Sky',
    classes: 'bg-sky-50',
    theme: 'light',
    type: 'solid',
  },
  {
    id: 'light-solid-warm',
    label: 'Warm Stone',
    classes: 'bg-stone-100',
    theme: 'light',
    type: 'solid',
  },

  // --- LIGHT THEME: GRADIENTS ---
  {
    id: 'light-grad-mist',
    label: 'Morning Mist',
    classes: 'bg-gradient-to-br from-slate-50 to-blue-100',
    theme: 'light',
    type: 'gradient',
  },
  {
    id: 'light-grad-sunset',
    label: 'Peach Sunset',
    classes: 'bg-gradient-to-tr from-orange-50 to-rose-100',
    theme: 'light',
    type: 'gradient',
  },
  {
    id: 'light-grad-nature',
    label: 'Fresh Mint',
    classes: 'bg-gradient-to-r from-emerald-50 to-teal-100',
    theme: 'light',
    type: 'gradient',
  },
  {
    id: 'light-grad-lavender',
    label: 'Lavender Haze',
    classes: 'bg-gradient-to-t from-fuchsia-50 via-purple-50 to-purple-100',
    theme: 'light',
    type: 'gradient',
  },
];

export const DARK_BACKGROUND_OPTIONS: BackgroundOption[] = [
  // --- DARK THEME: SOLIDS ---
  {
    id: 'dark-solid-slate',
    label: 'Deep Slate',
    classes: 'bg-slate-900',
    theme: 'dark',
    type: 'solid',
  },
  {
    id: 'dark-solid-neutral',
    label: 'Neutral Dark',
    classes: 'bg-neutral-950',
    theme: 'dark',
    type: 'solid',
  },
  {
    id: 'dark-solid-void',
    label: 'Pure Black',
    classes: 'bg-black',
    theme: 'dark',
    type: 'solid',
  },

  // --- DARK THEME: GRADIENTS ---
  {
    id: 'dark-grad-ocean',
    label: 'Deep Ocean',
    classes: 'bg-gradient-to-b from-slate-900 to-blue-950',
    theme: 'dark',
    type: 'gradient',
  },
  {
    id: 'dark-grad-midnight',
    label: 'Midnight Purple',
    classes: 'bg-gradient-to-tr from-violet-950 to-slate-900',
    theme: 'dark',
    type: 'gradient',
  },
  {
    id: 'dark-grad-forest',
    label: 'Forest Night',
    classes: 'bg-gradient-to-br from-emerald-950 to-black',
    theme: 'dark',
    type: 'gradient',
  },
  {
    id: 'dark-grad-ember',
    label: 'Glowing Ember',
    classes: 'bg-gradient-to-tl from-gray-900 to-red-950',
    theme: 'dark',
    type: 'gradient',
  },
  {
    id: 'dark-grad-cyber',
    label: 'Cyberpunk',
    classes: 'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900',
    theme: 'dark',
    type: 'gradient',
  },
  {
    id: 'dark-grad-galaxy',
    label: 'Galaxy',
    classes: 'bg-gradient-to-bl from-indigo-950 via-slate-950 to-black',
    theme: 'dark',
    type: 'gradient',
  },
];
