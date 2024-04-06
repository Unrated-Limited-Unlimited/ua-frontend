import { SSR_ON } from "$lib/env";
import { getFlagStore } from "../store/featureFlagStore";
import type { LayoutLoad } from "./$types";

export const ssr = SSR_ON;

export const load: LayoutLoad = async () => {
    await getFlagStore() 
}