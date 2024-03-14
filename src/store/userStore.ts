import { writable } from 'svelte/store';

export const loggedIn = writable(false);
export const username = writable('');
export const imgurl = writable('');