FROM node:latest

# Install packages
RUN apt-get update -y
RUN apt-get upgrade -y

# Create app directory
RUN mkdir -p /service

COPY ./package.json /service
WORKDIR /service
RUN npm install

# Copy all files into container.
COPY . /service

CMD yarn run start
