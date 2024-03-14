import { dec_msw } from "$lib/utils";

if (dec_msw) {
  const { worker } = await import("./mocks/browser");

  await worker.start({
    onUnhandledRequest(request, print) {
      // Do not warn on unhandled internal Svelte requests.
      // Those are not meant to be mocked.
      if (request.url.includes('svelte') || !request.url.includes('/api/')) {
        return;
      }

      print.warning();
    }
  });
}
