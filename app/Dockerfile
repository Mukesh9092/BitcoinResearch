FROM node:latest

# Install packages
RUN apt-get update -y
RUN apt-get upgrade -y

# Create app directory
RUN mkdir -p /service

# Install app dependencies
COPY package.json /service
COPY yarn.lock /service
WORKDIR /service
RUN yarn install

# Bundle app source
COPY . /service
RUN npm run build

# Set version and start
EXPOSE 3000
CMD npm start
