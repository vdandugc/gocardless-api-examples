declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CURRENT_ENV: "staging" | "production";
      GOCARDLESS_ACCESS_TOKEN: string;
      GOCARDLESS_MANDATE_CALLBACK_URL: string;
      SESSION_SECRET: string;
      WEBHOOK_ENDPOINT_SECRET: string;
    }
  }
}

export {};
