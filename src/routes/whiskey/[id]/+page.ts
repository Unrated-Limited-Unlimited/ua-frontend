import { url } from "$lib/utils";
import type { PageLoad } from "../../profile/$types"

export const load: PageLoad = async ({ fetch, params }) => {

	const res = await fetch(url("whiskey", params.id ));
	if (res.status !== 200) {
        return {}
    }
    return {
        whiskey: await res.json()
    }
}