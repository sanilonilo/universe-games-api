FROM node:latest

WORKDIR /usr/src/api

COPY ./package.json .

COPY ./.env .

COPY ./.env.dev .

COPY ./config.sh .

RUN npm install --only=prod
