import { http, graphql, HttpResponse, GraphQLHandler } from 'msw';

const ratings = [
    {
      "title": "Execellent whiskey",
      "score": "1",
      "body": "Nice whiskey! Absolutely lovely",
      "user": {"name": "Kaspar"}
    },
    {
      "title": "Among the better ones i've tasted",
      "score": "0.8",
      "body": "Quite good! Would buy again",
      "user": {"name":"Filip"}
    }
];

const categories = [
    {
        "id": 1,
        "name": "Time Travel Capability",
        "avgScore": 0.4
    },
    {
        "id": 2,
        "name": "Conversation Starter Level",
        "avgScore": 0.4
    }
];

const whiskeys = [
  {
      "id": "1",
      "title": "Gordon & Macphail Mortlach 1949",
      "price": "500",
      "summary": "Jura is a distinguished single malt Scotch whisky, named after the Isle of Jura in the Inner Hebrides of Scotland, where it has been distilled since 1810. The distillery itself, located in the small, remote community of Craighouse, is one of the oldest in Scotland, embodying centuries of tradition and whisky-making expertise. Jura whisky is renowned for its unique character, which is as mysterious and wild as the island itself.",
      "percentage": "40%",
      "img": "https://bilder.vinmonopolet.no/cache/1200x1200-0/187201-1.jpg",
      "volume": "70cl",
      "avgScore": "0.8",
      "ratings": ratings,
      "categories": categories
  },
  {
      "id": "2",
      "title": "Tullamore Dew",
      "price": "512",
      "summary": "speaks for itself",
      "percentage": "43%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/5670501-1.jpg",
      "volume": "70cl",
      "avgScore": "0.8",
      "ratings": ratings,
      "categories": categories
  },
  {
      "id": "3",
      "title": "Jameson",
      "price": "520",
      "summary": "Safe ol' reliable",
      "percentage": "41%",
      "img": "https://bilder.vinmonopolet.no/cache/515x515-0/16207-1.jpg",
      "volume": "75cl",
      "avgScore": "1",
      "ratings": ratings,
      "categories": categories
  }
];

const attributes = [
  {
    "id": "1",
    "name": "Time Travel Capability"
  },
  {
    "id": "2",
    "name": "Conversation Starter Level"
  },
];

export const handlers = [
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
    return new HttpResponse();
  }),
  graphql.mutation("EditUser", ({ cookies }) => {
    if (!cookies.authToken || cookies.authToken === "expired") {
        return HttpResponse.json({
            errors: []
        })
    }

    return HttpResponse.json({
        data: {
            editUser: {
                id: 18021700,
                name: 'Anne Beate',
                email: 'AB@mail.no'
            }
        }
    })
  }),
  graphql.query("LoggedInUser", ({cookies}) => {
    console.log(cookies)
    if (!cookies.authToken || cookies.authToken === "expired") {
        return HttpResponse.json({
            errors: []
        })
    }

    return HttpResponse.json({
        data: {
            getLoggedInUser: {
                id: 18021700,
                name: 'Tor-Arne Larsen',
                img: null,
                ratings: [
                    {
                        title: "Verdens beste",
                        body: "Jeg elsker denne",
                        score: 1,
                        whiskey: {
                          id:"1",
                          title: "Jura"
                        }
                    }
                ]
            }
        }
    })
  }),
  graphql.query("GetUser", () => {
    return HttpResponse.json({
        data: {
            getUser: {
                id: 18021700,
                name: 'Anne Beate',
                img: null,
                ratings: [
                    {
                        title: "Helt Ok",
                        body: "Den største skuffelsen er den du skaper selv #inspo #deep #thefeelingofdrowninginwhiskeyisbetterthendrowninginlava #youacualyfloatontopoflavabecausestoneisheavy",
                        score: 0.2,
                        whiskey: {
                          id:"1",
                          title: "Jura"
                        }
                    }
                ]
            }
        }
    })
  }),
  graphql.query("LoggedInUserInfo", ({cookies}) => {
    if (!cookies.authToken || cookies.authToken === "expired") {
        return HttpResponse.json({
            errors: []
        })
    }

    return HttpResponse.json({
        data: {
            getLoggedInUser: {
                id: 18021700,
                name: 'Tor-Arne Larsen',
                img: null,
                email: 'tal@mail.no'
            }
        }
    })
  }),
  graphql.query("Whiskeys", () => {
    return HttpResponse.json({
      data: {
        getWhiskeys: whiskeys
    }
    })
  }),
  graphql.query("Whiskey", ({ variables }) => {
    const { id } = variables;
    return HttpResponse.json({
      data: {
        getWhiskey: whiskeys.find(w => w.id === id)
    }
    })
  }),
  graphql.query("Ratings", ({variables}) => {
    return HttpResponse.json({
      data: {
        getRatings: {
          
        }
      }
    }) 
  }),
  // This is to get the attributes, shown in the rating section.
  graphql.query("Attributes", () => {
    return HttpResponse.json({
      data: {
        getAttributeCategories: attributes
      }
    })
  })
];