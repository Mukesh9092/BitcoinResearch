FROM node:latest

# Install packages
RUN apt-get update -y
RUN apt-get upgrade -y

# Create app directory
RUN mkdir -p /service

COPY ./package.json /service
COPY ./yarn.lock /service
WORKDIR /service
RUN yarn

# Copy all files into container.
COPY . /service

# Set version and start
EXPOSE 3001

CMD yarn run start
