FROM node:latest

# Install packages
RUN apt-get update -y
RUN apt-get upgrade -y

# Install REST Sessions http server.
RUN npm i -g rest-sessions

EXPOSE 3000

CMD rest-sessions
