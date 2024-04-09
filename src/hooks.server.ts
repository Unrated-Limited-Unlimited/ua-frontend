/** @type {import('@sveltejs/kit/hooks')} */
import { MSW_ON } from '$lib/env';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async({event, resolve}) => {
    let theme = event.cookies.get("siteTheme");
    theme = theme || "standard";

    const response = await resolve(event, {
      transformPageChunk: ({ html }) =>
        html.replace('data-theme=""', `data-theme="${theme}"`),
    });

    return response;
}


if (MSW_ON) {
  const { server } = await import('./mocks/node');

  server.listen();
}