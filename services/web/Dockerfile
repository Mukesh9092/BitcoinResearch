FROM node:10

# Expose the application's ports.
EXPOSE $WEB_PORT
EXPOSE $WEB_HMR_PORT
EXPOSE 9229

# Create app directory
RUN mkdir -p /service
WORKDIR /service

# In development, rely on volume
# Install dependencies.
#COPY package.json .
#RUN npm install
# Copy all files into container.
#COPY . .

# Run this command to start the application.
CMD npm run dev
