#FROM nginx:1.13.3-alpine
#RUN apk add --no-cache gettext
#COPY nginx.conf.template /etc/nginx/nginx.conf
##RUN envsubst '${PROXY_PORT},${APP_REMOTE},${API_REMOTE}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
#CMD nginx -g 'daemon off;'
#EXPOSE 4000

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

EXPOSE 4000
