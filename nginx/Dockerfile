FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx
COPY server_keys/reminisce.me.key /etc/ssl/
COPY server_keys/reminisce.me.crt /etc/ssl/
