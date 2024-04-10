FROM node:20

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

ENTRYPOINT node build/index.js
