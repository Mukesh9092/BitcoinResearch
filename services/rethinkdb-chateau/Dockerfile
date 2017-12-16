FROM node:9

# Expose the application's ports.
EXPOSE 8201

# Create app directory
RUN mkdir -p /service

# Run commands from this directory.
WORKDIR /service

# Install required global dependencies.
RUN npm i -g chateau;

# Copy all files into container.
COPY . /service

# Run this command to start the application.
CMD ./start-docker.sh
