/** @type {import('@sveltejs/kit/hooks')} */
import { dec_msw } from '$lib/utils';

export const handle = async({event, resolve}) => {

    const theme = event.cookies.get("siteTheme");
    const response = await resolve(event, {
        transformPageChunk: ({html}) =>
         html.replace('data-theme=""', `data-theme="${theme}"`),
    });

    return response;
}


if (dec_msw) {
  const { server } = await import('./mocks/node');

  server.listen();
}