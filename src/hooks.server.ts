/** @type {import('@sveltejs/kit/hooks')} */
import { MSW_ON } from '$lib/env';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async({event, resolve}) => {
  let theme = event.cookies.get("siteTheme");
  theme = theme || "standard";

  const response : Response = await resolve(event);

  if (response.headers.get('content-type')?.includes('text/html')) {
      let body = await response.text();
      body = body.replaceAll('<html ', `<html data-theme="${theme}" `);
      return new Response(body, response);
  }

  return response;
};


if (MSW_ON) {
  const { server } = await import('./mocks/node');

  server.listen();
}