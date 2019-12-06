FROM node:latest

RUN mkdir -p /service
WORKDIR /service

ADD . /service
RUN rm -rf node_modules
RUN yarn

CMD yarn dev
