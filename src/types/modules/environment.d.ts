export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_BASE_URL: string;
      VITE_HOST: string;
      NODE_ENV: string;
    }
  }
}
