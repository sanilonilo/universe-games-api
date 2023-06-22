FROM node:latest

WORKDIR /usr/src/api

COPY ./package.json .

RUN npm install --only=prod
