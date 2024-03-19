import { MSW_ON } from "$lib/env";
import { worker } from "./mocks/browser";

if (MSW_ON) {
  //const { worker } import("./mocks/browser");

    worker.start({
    onUnhandledRequest(request, print) {
      // Do not warn on unhandled internal Svelte requests.
      // Those are not meant to be mocked.
      if (request.url.includes('svelte') || !request.url.endsWith('/graphql')) {
        return;
      }

      print.warning();
    }
  });
}
