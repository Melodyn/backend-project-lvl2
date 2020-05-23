FROM node:14.2.0-alpine3.11

WORKDIR /usr/src/app

RUN apk update
RUN apk add --update-cache \
    bash \
    nano \
    make \
    asciinema

