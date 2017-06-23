FROM node:latest

# Install packages
RUN apt-get update -y
RUN apt-get upgrade -y

# Install REST Sessions http server.
RUN npm i -g redis-commander

CMD redis-commander --port 3000
