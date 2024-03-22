
import dotenv from 'dotenv'
dotenv.config()

import adapter_static from '@sveltejs/adapter-static';
import adapter_node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

function adapter() { 
    if (process.env.VITE_ADAPTER === "static") {
        return adapter_static({
                            strict: false,
                            fallback : '200.html'
                        });
    } else {
        return adapter_node();
    }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
