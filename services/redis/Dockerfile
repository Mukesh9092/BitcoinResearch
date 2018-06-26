FROM redislabs/rejson:latest

# Expose the application's ports.
EXPOSE $SERVICE_EXPOSE_PORT

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# Copy all files into container.
COPY ./services/redis .
COPY ./common ./common

# Run this command to start the application.
CMD /service/start-docker.sh
