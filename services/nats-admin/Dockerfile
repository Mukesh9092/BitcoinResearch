FROM node:10

# Expose the application's ports.
EXPOSE $SERVICE_EXPOSE_PORT
EXPOSE 9229

# Install required global dependencies.
RUN npm i -g natsboard

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# Create app directory
RUN mkdir -p ./service
WORKDIR ./service

# Run NPM Install.
COPY ./services/api/package.json .
RUN npm install

# Copy all files into container.
COPY ./services/nats-admin .
COPY ./common ./common

# Run this command to start the application.
CMD ./start-docker.sh
