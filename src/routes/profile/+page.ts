import { query } from '$lib/graphql';
import { loggedIn } from '../../store/userStore';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

const getLoggedInUser = `
query LoggedInUser {
    getLoggedInUser {
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
    if (get(loggedIn)) {
        const res = await query(fetch, getLoggedInUser)
        if (res.ok) {
            const json = await res.json()
            if (json.data) {
                return { user: json.data.getLoggedInUser }
            }
        }
    }
    loggedIn.set(false)
    return {}
}