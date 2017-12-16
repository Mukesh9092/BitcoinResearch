# Use the latest Redis base image.
FROM redis:latest

# Expose the application's ports.
EXPOSE 8100

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Run commands from this directory.
WORKDIR /service

# Run this command to start the application.
CMD ./start-docker.sh
