import { BACKEND_BASE_URL } from './env';


export function url(...args: string[]) {
    return BACKEND_BASE_URL + "/" + args.join("/")
}

export const graphql_url = BACKEND_BASE_URL + "/graphql"

