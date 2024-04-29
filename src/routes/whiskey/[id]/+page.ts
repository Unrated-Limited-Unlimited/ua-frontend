import { query } from "$lib/graphql";
import type { PageLoad } from "../../profile/$types";

const whiskey = `
query Whiskey($id: ID!) {
    getWhiskey(id: $id) {
        id
        title
        avgScore
        img
        summary
        ratings {
            id
            title
            score
            body
            user {
                name
                id
            }
        }
        categories {
            id
            name
            avgScore
        }
    }
}`;

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await query(fetch, whiskey, { id: params.id });
  if (res.status !== 200) {
    return { props: {} };
  }
  return {
    whiskey: (await res.json()).data.getWhiskey,
    id: params.id,
  };
};
