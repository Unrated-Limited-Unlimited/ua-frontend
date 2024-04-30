import { writable, type Writable } from 'svelte/store';
import flagsmith from 'flagsmith/isomorphic';
import { browser } from "$app/environment";
import type { IFlagsmith } from 'flagsmith/types';
import { FLAGSMITH } from '$lib/env';

type FeatureFlags = {
    fancyLogo: boolean,
    wiskeySpelling: string,
    recommendation: boolean
}

export const featureFlagStore: Writable<FeatureFlags | null> = writable(null);

function setFeatures(flagsmith: IFlagsmith) {
    featureFlagStore.set({ 
        fancyLogo: flagsmith.hasFeature("logo_change"),
        wiskeySpelling: flagsmith.getValue("whiskey_spelling"),
        recommendation: flagsmith.hasFeature("recommendation")
    })
}

async function initFlagsmith(flagsmith: IFlagsmith) {    
    await flagsmith.init({
        environmentID: FLAGSMITH,
        defaultFlags: {
            logo_change: { enabled: false },
            whiskey_spelling: { enabled: true, value: "whiskey" },
            recommendation: { enabled: true }
        },
        onChange() {
            setFeatures(flagsmith)
        }
    })
    setFeatures(flagsmith)
    
}

export async function getFlagStore() {
    if (browser) {
        await initFlagsmith(flagsmith)
    } else {
        // @ts-ignore
        const flagsmithSSR = flagsmith.createFlagsmithInstance()
        await initFlagsmith(flagsmithSSR)
    }
}

// Used other places to capitalize whiskey
export function capitalize(str: string | undefined): string | undefined {
    if (!str) {
        return undefined
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}
