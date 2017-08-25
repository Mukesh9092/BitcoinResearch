FROM nginx:1.13.3-alpine
RUN apk add --no-cache gettext
COPY nginx.conf.template /etc/nginx/nginx.conf.template
CMD envsubst '${PROXY_PORT},${APP_REMOTE},${API_REMOTE}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
EXPOSE 4000
