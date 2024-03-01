import { http, graphql, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/user', ({ cookies }) => {
    if (!cookies.authToken || cookies.authToken === "expired") {
        return new HttpResponse(null, { status: 403 })
    }
    return HttpResponse.json({
        id: 18021700,
        username: 'Tor-Arne Larsen',
        bio: 'Eg er Tor-Arne Larsen. Eg elskar viski.',
    });
  }),
  http.post('*/api/auth/login', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=abc-123',}
    })
  }),
  http.post('*/api/auth/logout', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=expired',}
    })
  }),
  http.post('*/api/auth/register', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=abc-123',}
    })
  }),
];