FROM node:18.10 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN yarn install

COPY . /app

EXPOSE 3000

CMD ["yarn", "serve"]
