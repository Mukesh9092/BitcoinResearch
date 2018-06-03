# From archlinux base and nvm.
FROM node:10

# Expose the application's ports.
EXPOSE $STRAPI_PORT
EXPOSE 9229

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Run commands from this directory.
WORKDIR /service

# Run this command to start the application.
CMD ./start-docker.sh
