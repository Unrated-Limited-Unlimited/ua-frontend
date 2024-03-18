import { mode, MODE } from "$lib/utils";

export const ssr = !(mode(MODE.MSW) || mode(MODE.STATIC));