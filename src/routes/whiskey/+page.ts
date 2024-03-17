import { url } from "$lib/utils"
import type { PageLoad } from "./$types"
import { query } from "$lib/graphql"

const whiskeys = `
query Whiskeys {
    getWhiskeys {
        id
        img
        title
        rating
    }
}
`

export const load: PageLoad = async ({ fetch }) => {
	const res = await query(fetch, whiskeys)
	if (res.status !== 200) {
        return {whiskey_list: []}
    }
    return {
        whiskey_list: (await res.json()).data.getWhiskeys
    }
}