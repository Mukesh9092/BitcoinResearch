FROM node:latest

RUN mkdir -p /service
WORKDIR /service
ADD package.json /service
ADD yarn.lock /service
RUN yarn

ADD . /service

CMD yarn dev
