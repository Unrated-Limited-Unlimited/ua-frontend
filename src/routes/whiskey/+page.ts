import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch("/api/whiskey")
	if (res.status == 403) {
        return {whiskey_list: []}
    }
    return {
        whiskey_list: await res.json()
    }
}