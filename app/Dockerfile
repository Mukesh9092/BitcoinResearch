FROM node:latest

# Install packages
RUN apt-get update -y
RUN apt-get upgrade -y

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Set version and start
EXPOSE 3000

WORKDIR /service
RUN yarn run build
CMD yarn run start
