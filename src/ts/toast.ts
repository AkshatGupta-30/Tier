export enum ToastType {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface IToast {
  isVisible: boolean;
  type: ToastType;
  message: string;
}
