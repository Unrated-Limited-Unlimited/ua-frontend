import type { PageLoad } from "../../profile/$types"

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch("/api/whiskey/"+params.id);
	if (res.status == 403) {
        return {}
    }
    return {
        whiskey: await res.json()
    }
}