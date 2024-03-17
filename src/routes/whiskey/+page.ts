import { url } from "$lib/utils"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(url("whiskey"))
	if (res.status !== 200) {
        return {whiskey_list: []}
    }
    return {
        whiskey_list: await res.json()
    }
}