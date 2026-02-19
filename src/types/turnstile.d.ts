/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type TurnstileWidgetId = string | number;

type TurnstileRenderOptions = {
  sitekey: string;
  action?: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: string | HTMLElement, options: TurnstileRenderOptions) => TurnstileWidgetId;
  reset: (widgetId?: TurnstileWidgetId) => void;
  remove: (widgetId: TurnstileWidgetId) => void;
};

interface Window {
  turnstile?: TurnstileApi;
}
