FROM node:10

# Expose the application's ports.
EXPOSE $API_PORT
EXPOSE 9229

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# Install dependencies.
COPY package.json .
RUN npm install

# Copy all files into container.
COPY . .

# Run this command to start the application.
CMD npm run dev
