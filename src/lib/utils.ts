import { PUBLIC_BASE_URL } from '$env/static/public';
import { dev } from '$app/environment';

export function url(...args: string[]) {
    return PUBLIC_BASE_URL + "/" + args.join("/")
}

export const graphql = PUBLIC_BASE_URL + "/graphql"

export enum MODE {
    MSW = "msw",
    STATIC = "static",
    DEFAULT = "default"
}

export function mode(m: MODE) { 
    return m === import.meta.env.MODE as MODE;
}

export const dec_msw = dev && mode(MODE.MSW);



