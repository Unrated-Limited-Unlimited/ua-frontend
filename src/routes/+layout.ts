import { mode, MODE } from "$lib/utils";

export const prerender = mode(MODE.STATIC);
export const ssr = !mode(MODE.STATIC);