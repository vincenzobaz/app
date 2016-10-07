FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/
COPY server_keys/reminisce.me.key /etc/ssl/
COPY server_keys/reminisce.me.crt /etc/ssl/
COPY maintenance_off.html /var/www/maintenance/
COPY maintenance_on.sh /
RUN chmod +x maintenance_on.sh
COPY maintenance_off.sh /
RUN chmod +x maintenance_off.sh
