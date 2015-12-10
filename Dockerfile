FROM node:4-slim

RUN mkdir /app
WORKDIR /app

RUN npm install -g grunt-cli

ADD package.json .
RUN npm install

ADD . .
RUN grunt build

CMD grunt execute
