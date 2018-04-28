# From archlinux base and nvm.
FROM node:latest

# Expose the application's ports.
EXPOSE $API_PORT

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Run commands from this directory.
WORKDIR /service

# Run this command to start the application.
CMD ./start-docker.sh
