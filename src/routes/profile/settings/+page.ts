import { query } from '$lib/graphql';
import { loggedIn } from '../../../store/userStore';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

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
    console.log(get(loggedIn))
    if (get(loggedIn)) {
        const res = await query(fetch, getLoggedInUser)
        if (res.status === 200) {

            return { user: (await res.json()).data.getLoggedInUser }
        }
    }
    redirect(302, "/profile/login")
}