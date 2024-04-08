import { query } from "$lib/graphql";
import type { PageLoad } from "../../../profile/$types"

const whiskey = `
query Whiskey($id: ID!) {
    getWhiskey(id: $id) {
        id
        title
        avgScore
        img
        attributes
    }
}`;

const attributes = `
query Attributes {
    getAttributeCategories: {
        id
        name
    }
}
`

export const load: PageLoad = async ({ fetch, params }) => {
    const res = await query(fetch, whiskey, {id: params.id });
    const rating = await query(fetch, attributes);
    if (rating.status !== 200 || rating.status !== 200) {
    }

    return {
        whiskey: (await res.json()).data.getWhiskey,
        attributes: (await rating.json()).data.getAttributeCategories,
        id: params.id
    }
}