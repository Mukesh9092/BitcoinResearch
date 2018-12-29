FROM postgres:latest

# Expose the application's ports.
EXPOSE $SERVICE_EXPOSE_PORT

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# Copy all files into container.
COPY ./services/postgresql /service

# Run this command to start the application.
CMD postgres -h $POSTGRES_HOST -p $POSTGRES_PORT
