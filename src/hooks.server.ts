/** @type {import('@sveltejs/kit/hooks')} */
import { MSW_ON } from '$lib/env';

if (MSW_ON) {
  const { server } = await import('./mocks/node');

  server.listen();
}