import { http, graphql, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/user', ({ cookies }) => {
    return HttpResponse.json({
        id: 18021700,
        username: 'Tor-Arne Larsen',
        bio: 'Eg er Tor-Arne Larsen. Eg elskar viski.',
    });
  }),
  http.post('*/login', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=abc-123',}
    })
  }),
  http.post('*/logout', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=expired',}
    })
  }),
  http.post('*/register', ({ cookies }) => {
    return new HttpResponse(null, {
        headers: {'Set-Cookie': 'authToken=abc-123',}
    })
  }),
];