FROM node:latest

# Install packages
RUN apt-get update -y
RUN apt-get upgrade -y

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Set version and start
EXPOSE 3001

WORKDIR /service
CMD yarn run start
