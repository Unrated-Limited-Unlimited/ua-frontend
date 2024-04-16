import type { PageLoad } from "./$types"
import { query } from "$lib/graphql"

const whiskeys = `
query Whiskeys($page: Int!, $pageSize: Int!) {
    getWhiskeys(page: $page, size: $pageSize) {
        id
        img
        title
        avgScore
    }
}
`
const variables = {
    page: 0,
    pageSize: 20,
  };

export const load: PageLoad = async ({ fetch }) => {
	const res = await query(fetch, whiskeys)
	if (res.status !== 200 && (await res.json()).error) {
        return {whiskey_list: []}
    }
    return {
        whiskey_list: (await res.json()).data.getWhiskeys
    }
}