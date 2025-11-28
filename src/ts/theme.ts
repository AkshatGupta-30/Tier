export enum ThemeModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface BackgroundOption {
  id: string;
  label: string;
  classes: string;
  theme: string;
  type: string;
}
