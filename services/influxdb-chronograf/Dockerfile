FROM node:10

# Expose the application's ports.
EXPOSE $SERVICE_EXPOSE_PORT
EXPOSE 9229

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# Run NPM Install.
COPY ./services/api/package.json .
RUN npm install

# Copy all files into container.
COPY ./services/influxdb-chronograf .
COPY ./common ./common

# Run this command to start the application.
CMD ./start-docker.sh
