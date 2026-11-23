// config.ts
// Set VITE_API_BASE in Vercel (or frontend/.env.local for local dev) to override.
export const API_BASE: string =
  import.meta.env.VITE_API_BASE ??
  (import.meta.env.DEV
    ? "http://localhost:5050"
    : "https://researchconnectai-production.up.railway.app");
