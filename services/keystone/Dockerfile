FROM node:latest

RUN mkdir -p /service
WORKDIR /service

ADD package.json /service
RUN yarn

ADD . /service

CMD yarn dev
