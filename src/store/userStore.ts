import { persisted } from 'svelte-persisted-store';

export const loggedIn = persisted("loggedIn", true);
