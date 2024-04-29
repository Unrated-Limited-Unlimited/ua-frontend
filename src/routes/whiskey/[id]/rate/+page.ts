import { query } from "$lib/graphql";
import type { PageLoad } from "../../../profile/$types"
import { redirect } from '@sveltejs/kit';
import { loggedIn } from "../../../../store/userStore";
import { get } from "svelte/store";

const whiskey = `
query Whiskey($id: ID!) {
    getWhiskey(id: $id) {
        id
        title
        avgScore
        img
    }
}`;

const attributes = `
query Attributes {
    getAttributeCategories {
        id
        name
    }
}
`


export const load: PageLoad = async ({ fetch, params }) => {
    if (!get(loggedIn)) {
        redirect(302, "/profile/login")
    }

    const res = await query(fetch, whiskey, {id: params.id });
    const rating = await query(fetch, attributes);
    if (res.status !== 200) {
        return null;
    }

    return {
        whiskey: (await res.json()).data.getWhiskey,
        attributes: (await rating.json()).data.getAttributeCategories,
        id: params.id
    }
}