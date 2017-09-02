FROM node:8

# Create app directory
RUN mkdir -p /service

COPY ./package.json /service
WORKDIR /service
RUN npm install

# Copy all files into container.
COPY . /service

WORKDIR /service

CMD npm run start

EXPOSE 4002
