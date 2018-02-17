FROM rethinkdb:latest

# Expose the application's ports.
EXPOSE 8102 8103 8200

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Run commands from this directory.
WORKDIR /service

# Run this command to start the application.
CMD ./start-docker.sh
