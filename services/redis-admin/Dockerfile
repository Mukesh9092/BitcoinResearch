FROM node:10

# Expose the application's ports.
EXPOSE $SERVICE_EXPOSE_PORT
EXPOSE 9229

# Install required global dependencies.
RUN npm i -g redis-commander

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# Copy all files into container.
COPY ./services/redis-admin .

# Run this command to start the application.
CMD ./bin/docker-start
