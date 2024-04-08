import type { PageLoad } from "./$types"
import { query } from "$lib/graphql"

const whiskeys = `
query Whiskeys {
    getWhiskeys {
        id
        img
        title
        avgScore
    }
}
`

export const load: PageLoad = async ({ fetch }) => {
	const res = await query(fetch, whiskeys)
	if (res.status !== 200 && (await res.json()).error) {
        return {whiskey_list: []}
    }
    return {
        whiskey_list: (await res.json()).data.getWhiskeys
    }
}