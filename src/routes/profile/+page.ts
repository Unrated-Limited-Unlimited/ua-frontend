import { url } from '$lib/utils';
import { loggedIn } from '../../store/userStore';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    if (get(loggedIn)) {
        const res = await fetch(url("user"))
        if (res.status === 200) {
            return { user: await res.json() }
        }
    }
    return {}
}