FROM node:14-alpine as builder

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm install cors

COPY . .

RUN yarn build

FROM node:14-alpine

COPY --from=builder /app .

EXPOSE 3000

CMD [ "yarn", "start" ]
