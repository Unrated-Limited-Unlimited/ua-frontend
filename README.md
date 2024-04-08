![Alt workflow-badge](https://github.com/Unrated-Limited-Unlimited/ua-frontend/actions/workflows/main.yml/badge.svg)

# This is the Frontend for Unrated: The whiskey rating app.
This is the frontend for Unrated, an application created in the context of the subject DAT251 at HVL (Western Norway University of Applied Sciences) 

The frontend is created using SvelteKit, and has partial test coverage using Cypress


## Setup

Enviroment variables:
```
PUBLIC_BACKEND_BASE_URL: The URL that the backend is running on
VITE_FLAGSMITH: The SDK enviroment varible to flagsmith
        Flagsmith flags:
                logo_change: When enabled, a different logo is used
                whiskey_spelling: Changes the spelling of the whiksey to the set value

VITE_ADAPTER: Tells what adapter to use. Possible "node" and "static". Defaults to "node".
VITE_MSW: "true" if it should build with a mocked backend.
```
