FROM node:10

# Expose the application's ports.
EXPOSE $SERVICE_EXPOSE_PORT
EXPOSE 9229

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# Copy all files into container.
COPY ./services/api .
COPY ./bin ./bin

# Run this command to start the application.
CMD ./start-docker.sh
