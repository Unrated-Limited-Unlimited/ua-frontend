import { query } from "$lib/graphql";
import type { PageLoad } from "../../../profile/$types"

const ratings = `
query Ratubg($id: ID!) {
    getRating(id: $id) {
        id
        title
        score
        body
        whiskey {
          id
          title
        }
        attributes {
          id
          score
          category {
            id
            name
          }
        }
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
    const res = await query(fetch, ratings, {id: params.id });
    const rating = await query(fetch, attributes);

    return {
        rating: (await res.json()).data.getRating,
        attributes: (await rating.json()).data.getAttributeCategories,
        id: params.id
    }
}