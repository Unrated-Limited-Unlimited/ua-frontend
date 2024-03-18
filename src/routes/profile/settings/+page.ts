import { query } from '$lib/graphql';
import { loggedIn } from '../../../store/userStore';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

const getLoggedInUser = `
query LoggedInUserInfo {
    getLoggedInUser {
        id
        name
        img
        email
    }
}`

export const load: PageLoad = async ({ fetch }) => {
    if (get(loggedIn)) {
        const res = await query(fetch, getLoggedInUser)
        if (res.status === 200) {
            return { user: (await res.json()).data.getLoggedInUser }
        }
    }
    return {}
}