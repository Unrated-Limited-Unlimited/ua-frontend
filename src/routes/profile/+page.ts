import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch("/api/user")
	if (res.status == 403) {
        return {}
    }
    return {
        user: await res.json()
    }
}