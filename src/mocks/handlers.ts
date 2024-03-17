import { http, graphql, HttpResponse } from 'msw';

const whiskeys = [
  {
      "id": "1",
      "name": "Jura",
      "price": "500",
      "summary": "Jura is a good whiskey",
      "percentage": "40%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/14676201-1.jpg",
      "volume": "70cl",
      "score": "4"
  },
  {
      "id": "2",
      "name": "Tullamore Dew",
      "price": "512",
      "summary": "speaks for itself",
      "percentage": "43%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/5670501-1.jpg",
      "volume": "70cl",
      "score": "4"
  },
  {
      "id": "3",
      "name": "Jameson",
      "price": "520",
      "summary": "Safe ol' reliable",
      "percentage": "41%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/16207-1.jpg",
      "volume": "75cl",
      "score": "5"
  }
  ];

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

  http.get("*/whiskey", () => {
    return HttpResponse.json({
      whiskeys
    })
  }),

  http.get(`*/whiskey/1`, () => {
    return HttpResponse.json({
      "id": "1",
      "name": "Jura Single Malt 10 YO",
      "price": "500",
      "summary": "Jura is a good whiskey",
      "percentage": "40%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/14676201-1.jpg",
      "volume": "70cl",
      "score": "4",
      "producer": "Isle of Jura Dist.",
      "product-type": "Brennevin - Whisky - Whisky, malt",
      "country": "Skottland"
    })
  }),
  http.get(`*/whiskey/2`, () => {
    return HttpResponse.json({
      "id": "2",
      "name": "Tullamore Dew",
      "price": "512",
      "summary": "speaks for itself",
      "percentage": "43%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/5670501-1.jpg",
      "volume": "70cl",
      "score": "4",
      "producer": "Isle of Jura Dist.",
      "product-type": "Brennevin - Whisky - Whisky, malt",
      "country": "Skottland"
    })
  }),
  http.get(`*/whiskey/3`, () => {
    return HttpResponse.json({
      "id": "3",
      "name": "Jameson",
      "price": "520",
      "summary": "Safe ol' reliable",
      "percentage": "41%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/16207-1.jpg",
      "volume": "75cl",
      "score": "5",
      "producer": "Isle of Jura Dist.",
      "product-type": "Brennevin - Whisky - Whisky, malt",
      "country": "Skottland"
    })
  })
];