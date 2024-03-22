import { graphql_url } from "./utils";

export async function query(
    fetch: { (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>; (input: string | Request | URL, init?: RequestInit | undefined): Promise<Response>; (arg0: string, arg1: { method: string; body: string; }): any; }, 
    query: string,
    variables?: Object
) {
    const q = { query: query, variables: variables}
    return await fetch(graphql_url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(q),
        credentials: "include"
    })
}

export async function mutate(
    mutation: string,
    variables?: Object
) {
    const q = { query: mutation, variables: variables}
    return await fetch(graphql_url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(q),
        credentials: "include"
    })
}