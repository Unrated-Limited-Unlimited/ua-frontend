import { PUBLIC_BASE_URL } from '$env/static/public';
import { dev } from '$app/environment';

const base_url = PUBLIC_BASE_URL || "http://localhost:8000"

export function url(...args: string[]) {
    return base_url + "/" + args.join("/")
}

export const graphql_url = base_url + "/graphql"

export enum MODE {
    MSW = "msw",
    STATIC = "static",
    DEFAULT = "default"
}

export function mode(m: MODE) { 
    return m === import.meta.env.MODE as MODE;
}

export const dec_msw = true; // dev && mode(MODE.MSW);



