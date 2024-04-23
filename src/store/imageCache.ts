import { get, writable, type Writable } from 'svelte/store';

const imageCache = writable(new Date())

export function newImageCache() {
    imageCache.set(new Date())
}

export function getImageSufix() {
    return get(imageCache).getTime()
}