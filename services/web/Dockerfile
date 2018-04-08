# From archlinux base and nvm.
FROM archlinux/base

RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm awk curl grep tar which 

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 9.10.1

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

RUN source $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Expose the application's ports.
EXPOSE $WEB_PORT

# Create app directory
RUN mkdir -p /service

# Copy all files into container.
COPY . /service

# Run commands from this directory.
WORKDIR /service

# Run this command to start the application.
CMD ./start-docker.sh
