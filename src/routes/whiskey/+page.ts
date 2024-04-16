import type { PageLoad } from "./$types"
import { query } from "$lib/graphql"

const whiskeys = `
query Whiskeys($paging: Paging!) {
    getWhiskeys(paging: $paging) {
        id
        img
        title
        avgScore
        summary
    }
}
`
const variables = {
    paging: {
        page: 0,
        size: 20,
    }
  };

export const load: PageLoad = async ({ fetch }) => {
	const res = await query(fetch, whiskeys, variables)
	if (res.status !== 200 && (await res.json()).error) {
        return {whiskey_list: []}
    }
    return {
        whiskey_list: (await res.json()).data.getWhiskeys
    }
}