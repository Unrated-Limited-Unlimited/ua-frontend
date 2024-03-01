/** @type {import('@sveltejs/kit/hooks')} */

export const handle = async({event, resolve}) => {

    const theme = event.cookies.get("siteTheme");
    const response = await resolve(event, {
        transformPageChunk: ({html}) =>
         html.replace('data-theme=""', `data-theme="${theme}"`),
    });

    return response;
}

import { dev } from '$app/environment';

if (dev) {
  const { server } = await import('./mocks/node');

  server.listen();
}