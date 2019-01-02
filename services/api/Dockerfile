FROM node:latest

# Expose the application's ports.
#EXPOSE $API_PORT
#EXPOSE 9229

# Create app directory
RUN mkdir -p /service
WORKDIR /service
COPY package.json .
COPY package-lock.json .
RUN npm install

# Run this command to start the application.
CMD npm run dev
