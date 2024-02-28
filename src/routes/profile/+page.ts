import type { PageLoad } from './$types';

export const ssr = false;
//export const prerender = false;

export const load: PageLoad = ({ params }) => {
    return {
        user: {
            id: 18021700,
            username: 'Tor-Arne Larsen',
            bio: 'Eg er Tor-Arne Larsen. Eg elskar viski.',
        }
    };
};