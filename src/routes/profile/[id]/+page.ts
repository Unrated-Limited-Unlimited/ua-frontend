import { query } from '$lib/graphql';
import type { PageLoad } from './$types';

const getLoggedInUser = `
query GetUser($id: ID!) {
    getUser(id: $id) {
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

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await query(fetch, getLoggedInUser, { id: params.id })
    if (res.status === 200) {
        return { user: (await res.json()).data.getUser }
    }
    return {}
}