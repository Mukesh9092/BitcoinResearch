FROM node:10

# Install EVERYTHING
RUN apt-get update
RUN apt-get dist-upgrade -y
RUN apt-get update
RUN apt-get install -y software-properties-common
#RUN add-apt-repository ppa:ubuntu-toolchain-r/test
RUN apt-get update
RUN apt-get install -y curl build-essential supervisor wget libstdc++6
RUN apt-get upgrade -y

# Expose the application's ports.
EXPOSE $SERVICE_EXPOSE_PORT
EXPOSE 9229

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# Copy all files into container.
COPY ./services/$SERVICE_NAME .

# Run this command to start the application.
CMD ./common/bin/docker-start
