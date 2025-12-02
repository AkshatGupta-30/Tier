export enum ThemeModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface BackgroundOption {
  id: string;
  classes: string;
  type: 'solid' | 'gradient' | 'image' | 'button';
  label?: string;
  theme?: string;
  value?: string;
  isCustom?: boolean;
}
