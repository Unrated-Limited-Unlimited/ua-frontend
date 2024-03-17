import { query } from "$lib/graphql";
import { url } from "$lib/utils";
import type { PageLoad } from "../../profile/$types"

const whiskey = `
query Whiskey($id: ID!) {
    getWhiskey(id: $id) {
        id
        title
        rating
        img
    }
}`;

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await query(fetch, whiskey, {id: params.id})
	if (res.status !== 200) {
        return {}
    }
    return {
        whiskey: (await res.json()).data.getWhiskey
    }
}