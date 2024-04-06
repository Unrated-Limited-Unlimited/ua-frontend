import { env } from '$env/dynamic/public';

export const BACKEND_BASE_URL = env.PUBLIC_BACKEND_BASE_URL || "http://localhost:8000";
export const MSW_ON = import.meta.env.VITE_MSW && import.meta.env.VITE_MSW === "true";
export const SSR_ON = !(MSW_ON || (import.meta.env.VITE_ADAPTER && import.meta.env.VITE_ADAPTER === "static"));
export const FLAGSMITH = import.meta.env.VITE_FLAGSMITH || null;