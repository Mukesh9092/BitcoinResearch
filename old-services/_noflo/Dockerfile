# Use the latest Node.js base image.
FROM node:9

# Expose the application's ports.
EXPOSE 8004

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Run commands from this directory.
WORKDIR /service

# Run this command to start the application.
CMD ./start-docker.sh
