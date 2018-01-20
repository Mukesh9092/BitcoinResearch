FROM postgres:latest

# Expose the application's ports.
EXPOSE 8101

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Run commands from this directory.
WORKDIR /service

# Run this command to start the application.
CMD postgres -h $POSTGRES_HOST -p $POSTGRES_PORT
