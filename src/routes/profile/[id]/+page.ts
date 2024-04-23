import { query } from '$lib/graphql';
import type { PageLoad } from './$types';

const getLoggedInUser = `
query GetUser {
    getUser {
        id
        name
        img
        ratings {
            whiskey {
                id
                title
            }
            title
            score
            body
        }
    }
}`

export const load: PageLoad = async ({ fetch }) => {
    const res = await query(fetch, getLoggedInUser)
    if (res.status === 200) {
        return { user: (await res.json()).data.getUser }
    }
    return {}
}