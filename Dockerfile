FROM node:latest

WORKDIR /usr/src/api

COPY ./package.json .

COPY ./start.sh .

RUN npm install --only=prod
